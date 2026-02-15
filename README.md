# Police Reservation PIN System Test Assessment

Full-stack reservation system for booking appointments with police authorities including PIN generation

## Tech stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS, React Router, Axios
- **Backend**: Node.js, Express, TypeScript, Sequelize, PostgreSQL, Jest

## Project structure

- `backend/` – Node.js/Express API, PostgreSQL integration, PIN logic, migrations, and tests.
- `frontend/` – React single-page app with reservation list and reservation form.

See the dedicated READMEs in each subfolder for details:

- `backend/README.md`
- `frontend/README.md`

## Quick start (Docker – whole app)

The easiest way to run the whole stack (Postgres + backend + frontend) is via Docker Compose.

1. In the project root, build and start all services:

   ```bash
   docker compose up --build
   ```

2. Access the app:

   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`
   - PostgreSQL: `localhost:5432` (inside Docker network it’s reachable as `db`)

To stop everything:

```bash
docker compose down
```

> Note: if you prefer running things without Docker, see `backend/README.md` and `frontend/README.md` for manual setup (npm install, migrations, etc.).

## High-level behavior

- Users can create reservations by providing their name, phone number, and a reservation time.
- The backend generates a PIN that:
  - Becomes active **15 minutes before** the reservation.
  - Has a limited validity window around the reservation.
  - Is automatically **extended** in case of queues, based on the number of people ahead and capped at a maximum extension.
- Users confirm their reservation on the frontend by entering their PIN; the confirmation endpoint responds with queue size and applied extension so the UI can explain what happened.

