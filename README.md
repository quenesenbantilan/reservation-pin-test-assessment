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

## Quick start

### 1. Backend

1. Navigate to the backend:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables by creating a `.env` file (see `backend/README.md` for exact keys).

4. Run database migrations:

   ```bash
   npm run migrate
   ```

5. Start the backend API:

   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:4000` by default.

### 2. Frontend

1. Open a new terminal and go to the frontend:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend dev server:

   ```bash
   npm run dev
   ```

The app will start on the Vite dev server (for example `http://localhost:5173`) and will call the backend at `http://localhost:4000` (configurable in `frontend/src/services/api.ts`).

## High-level behavior

- Users can create reservations by providing their name, phone number, and a reservation time.
- The backend generates a PIN that:
  - Becomes active **15 minutes before** the reservation.
  - Has a limited validity window around the reservation.
  - Is automatically **extended** in case of queues, based on the number of people ahead and capped at a maximum extension.
- Users confirm their reservation on the frontend by entering their PIN; the confirmation endpoint responds with queue size and applied extension so the UI can explain what happened.

