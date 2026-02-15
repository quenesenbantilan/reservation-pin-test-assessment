import { sequelize } from "../config/database";
import { up as createReservationsTable } from "../migrations/001-create-reservations";

async function runMigrations(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("Database connected, running migrations...");

    const queryInterface = sequelize.getQueryInterface();

    await createReservationsTable(queryInterface);

    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

void runMigrations();

