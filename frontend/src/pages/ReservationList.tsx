import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Reservation } from "../types/reservation";
import type { ConfirmReservationResponse } from "../types/api";
import { extractErrorMessage } from "../utils/http";

export default function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchReservations = async (): Promise<void> => {
    try {
      const res = await api.get<Reservation[]>("/reservations");
      setReservations(res.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    void fetchReservations();
    const interval = setInterval(() => {
      void fetchReservations();
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  const confirmPin = async (): Promise<void> => {
    if (!pin.trim()) {
      setMessage("Please enter a PIN code.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await api.post<ConfirmReservationResponse>("/reservations/confirm", { pin });
      const { queueSize, extensionMinutes } = res.data;
      setMessage(
        `Confirmed. Queue length: ${queueSize}, extended validity by ${extensionMinutes} minutes.`
      );
      await fetchReservations();
    } catch (error) {
      setMessage(extractErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Reservations overview</h1>
        <p className="text-sm text-slate-400">
          Confirm your reservation by entering the PIN code you received. List is sorted from
          oldest to newest.
        </p>
      </header>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="Enter your 6-digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <button
            type="button"
            onClick={confirmPin}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-600"
          >
            {loading ? "Checking..." : "Confirm PIN"}
          </button>
        </div>
        {message && (
          <p className="mt-3 text-sm text-slate-200">
            {message}
          </p>
        )}
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 shadow-sm">
        <div className="border-b border-slate-800 px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          All reservations
        </div>
        <ul className="divide-y divide-slate-800">
          {reservations.length === 0 && (
            <li className="px-4 py-6 text-sm text-slate-400">
              No reservations yet.
            </li>
          )}
          {reservations.map((reservation) => {
            const expired = reservation.status === "EXPIRED";
            const confirmed = reservation.status === "CONFIRMED";

            return (
              <li
                key={reservation.id}
                className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="font-medium text-slate-50">
                    {reservation.firstName} {reservation.lastName}
                  </div>
                  <div className="text-xs text-slate-400">
                    {new Date(reservation.reservationTime).toLocaleString()} •{" "}
                    {reservation.phone}
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-2 sm:mt-0">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                      expired
                        ? "bg-red-900/60 text-red-300"
                        : confirmed
                        ? "bg-emerald-900/60 text-emerald-300"
                        : "bg-amber-900/60 text-amber-300"
                    }`}
                  >
                    {reservation.status}
                  </span>
                  {!expired && !confirmed && (
                    <span className="text-xs text-slate-400">
                      PIN active from{" "}
                      {reservation.pinActivatedAt
                        ? new Date(reservation.pinActivatedAt).toLocaleTimeString()
                        : "N/A"}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
