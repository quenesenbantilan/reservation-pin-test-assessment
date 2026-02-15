import { useState } from "react";
import { api } from "../services/api";
import type { CreateReservationPayload } from "../types/api";
import { extractErrorMessage } from "../utils/http";

export default function ReservationForm() {
  const [form, setForm] = useState<CreateReservationPayload>({
    firstName: "",
    lastName: "",
    phone: "",
    reservationTime: ""
  });

  const [pin, setPin] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setPin(null);

    try {
      const reservationTimeIso = new Date(form.reservationTime).toISOString();

      const res = await api.post("/reservations", {
        ...form,
        reservationTime: reservationTimeIso
      });
      setPin(res.data.pinCode);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">New reservation</h1>
        <p className="text-sm text-slate-400">
          Pick a time, fill in your contact details, Ill generate a PIN that becomes
          active 15 minutes before your appointment.
        </p>
      </header>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              First name
            </label>
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              name="firstName"
              placeholder="Jane"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Last name
            </label>
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              name="lastName"
              placeholder="Doe"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Phone number
            </label>
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              name="phone"
              placeholder=""
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Time of reservation
            </label>
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              type="datetime-local"
              name="reservationTime"
              value={form.reservationTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sm:col-span-2 flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-600"
            >
              {submitting ? "Booking..." : "Book reservation"}
            </button>
          </div>
        </form>

        {pin && (
          <p className="mt-4 text-sm text-sky-300">
            Your PIN code: <span className="font-mono text-base font-semibold">{pin}</span>
          </p>
        )}

        {error && (
          <p className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
