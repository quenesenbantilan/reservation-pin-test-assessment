# Frontend

React + TypeScript + Vite + TailwindCSS frontend

## Prerequisites

- Node.js 18+

## 1. Installation

```bash
cd frontend
npm install
```

## 2. Running the frontend

```bash
cd frontend
npm run dev
```

The app will start on the Vite dev server (typically `http://localhost:5173`). It expects the backend API at `http://localhost:4000`.

`src/services/api.ts`:

```ts
export const api = axios.create({
  baseURL: "http://localhost:4000",
});
```

## 3. Pages

- **Reservation overview (Page 1)** – `src/pages/ReservationList.tsx`
  - Lists all reservations sorted from oldest to newest.
  - Provides a small PIN confirmation form and displays queue size + extension information.
- **Reservation form (Page 2)** – `src/pages/ReservationForm.tsx`
  - Collects first name, last name, phone number, and reservation time.
  - On submit, calls the backend and shows the generated PIN.

Routing is defined in `src/routes/AppRoutes.tsx` and rendered inside `src/App.tsx`.
