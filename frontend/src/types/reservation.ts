export type ReservationStatus = "PENDING" | "CONFIRMED" | "EXPIRED";

export interface Reservation {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  reservationTime: string;
  pinCode?: string;
  pinActivatedAt?: string;
  pinExpiresAt?: string;
  pinConfirmedAt?: string | null;
  status: ReservationStatus;
  createdAt?: string;
  updatedAt?: string;
}

