# Backend

Node.js + Express + TypeScript + Sequelize + PostgreSQL

## Prerequisites

- Node.js 18+
- PostgreSQL database

## 1. Installation

```bash
cd backend
npm install
```

## 2. Environment variables

Create a `.env` file in `backend/`:

```bash
DB_NAME=your_database_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
PORT=4000
```

## 3. Database migrations

This project **does not** use `sequelize.sync()` at runtime. Tables are created only via migrations.

Migration entry:

- `src/migrations/001-create-reservations.ts` – creates the `reservations` table.
- `src/scripts/migrate.ts` – connects to PostgreSQL and runs the migration.

Run migrations:

```bash
cd backend
npm run migrate
```

You can safely re-run this command; the migration is idempotent.

## 4. Running the backend

```bash
cd backend
npm run dev
```

The API will listen by default on `http://localhost:4000`.

## 5. Running tests

```bash
cd backend
npm test
```

This runs Jest tests, including the PIN queue extension algorithm tests in `src/services/__tests__/pinAlgorithm.test.ts`.

## 6. API overview

- `POST /reservations` – create a reservation and generate a PIN.
  - PIN is **activated** 15 minutes before the reservation time.
  - Base PIN validity ends 15 minutes after the reservation time.
- `POST /reservations/confirm` – confirm a reservation by PIN.
  - Enforces activation/expiration rules.
  - Detects queueing by counting active PENDING reservations ahead in time.
  - Extends PIN validity based on queue size, with a capped extension window.
- `GET /reservations` – list all reservations ordered from oldest to newest.

