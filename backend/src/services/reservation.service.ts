import { Op } from "sequelize";
import { Reservation } from "../models/reservation.model";
import { generatePin } from "../utils/pin";
import { AppError } from "../errors/AppError";

export interface CreateReservationInput {
  firstName: string;
  lastName: string;
  phone: string;
  reservationTime: string;
}

export interface ConfirmReservationResult {
  reservation: Reservation;
  queueSize: number;
  extensionMinutes: number;
}

const AVERAGE_PROCESSING_MINUTES = 4;
const MAX_EXTENSION_MINUTES = 30;

export interface QueueExtensionInput {
  peopleAhead: number;
  currentExpiration: Date;
}

export interface QueueExtensionResult {
  extendedExpiration: Date;
  extensionMinutes: number;
}

export const calculateQueueExtension = ({
  peopleAhead,
  currentExpiration
}: QueueExtensionInput): QueueExtensionResult => {
  const calculatedExtension = peopleAhead * AVERAGE_PROCESSING_MINUTES;
  const extensionMinutes = Math.min(calculatedExtension, MAX_EXTENSION_MINUTES);

  const extendedExpiration = new Date(
    currentExpiration.getTime() + extensionMinutes * 60_000
  );

  return { extendedExpiration, extensionMinutes };
};

export const createReservation = async (
  data: CreateReservationInput
): Promise<Reservation> => {
  if (!data.firstName || !data.lastName || !data.phone || !data.reservationTime) {
    throw new AppError("All fields are required", 400);
  }

  const reservationTime = new Date(data.reservationTime);

  if (reservationTime < new Date()) {
    throw new AppError("Reservation time must be in the future", 400);
  }

  const pin = generatePin();

  const activatedAt = new Date(reservationTime.getTime() - 15 * 60_000);
  const expiresAt = new Date(reservationTime.getTime() + 15 * 60_000);

  return Reservation.create({
    ...data,
    pinCode: pin,
    pinActivatedAt: activatedAt,
    pinExpiresAt: expiresAt
  });
};

export const confirmReservation = async (
  pin: string
): Promise<ConfirmReservationResult> => {
  const reservation = await Reservation.findOne({
    where: { pinCode: pin }
  });

  if (!reservation) {
    throw new AppError("Invalid PIN", 404);
  }

  const now = new Date();

  const status = reservation.getDataValue("status") as string;
  const activatedAt = reservation.getDataValue("pinActivatedAt") as Date;
  const expiresAt = reservation.getDataValue("pinExpiresAt") as Date;
  const reservationTime = reservation.getDataValue("reservationTime") as Date;

  if (status === "CONFIRMED") {
    throw new AppError("Reservation already confirmed", 409);
  }

  if (status === "EXPIRED") {
    throw new AppError("PIN already expired", 410);
  }

  if (now < activatedAt) {
    throw new AppError("PIN not active yet", 400);
  }

  const peopleAhead = await Reservation.count({
    where: {
      reservationTime: { [Op.lt]: reservationTime },
      status: "PENDING",
      pinActivatedAt: { [Op.lte]: now },
      pinExpiresAt: { [Op.gt]: now }
    }
  });

  const { extendedExpiration, extensionMinutes } = calculateQueueExtension({
    peopleAhead,
    currentExpiration: expiresAt
  });

  if (now > extendedExpiration) {
    reservation.set({ status: "EXPIRED" });
    await reservation.save();
    throw new AppError("PIN expired", 410);
  }

  reservation.set({
    status: "CONFIRMED",
    pinConfirmedAt: now,
    pinExpiresAt: extendedExpiration
  });

  await reservation.save();

  return {
    reservation,
    queueSize: peopleAhead,
    extensionMinutes
  };
};
