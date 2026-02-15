import { Link, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold tracking-wide text-sky-400">
            Police Reservation Center
          </span>

          <nav className="flex gap-4 text-sm">
            <Link
              to="/"
              className={`transition-colors hover:text-sky-300 ${
                location.pathname === "/"
                  ? "text-sky-300"
                  : "text-slate-200"
              }`}
            >
              Reservations
            </Link>
            <Link
              to="/new"
              className={`transition-colors hover:text-sky-300 ${
                location.pathname === "/new"
                  ? "text-sky-300"
                  : "text-slate-200"
              }`}
            >
              New Reservation
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <AppRoutes />
      </main>
    </div>
  );
}
