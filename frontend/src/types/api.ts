import type { Reservation } from "./reservation";

export interface CreateReservationPayload {
  firstName: string;
  lastName: string;
  phone: string;
  reservationTime: string;
}

export interface ConfirmReservationResponse {
  reservation: Reservation;
  queueSize: number;
  extensionMinutes: number;
}

export interface ApiErrorResponse {
  error: string;
}

