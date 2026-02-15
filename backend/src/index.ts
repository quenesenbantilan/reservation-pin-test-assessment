import dotenv from "dotenv";
import { sequelize } from "./config/database";
import app from "./app";
import { startExpirationJob } from "./jobs/expirationJob";

dotenv.config();

const PORT = process.env.PORT || 4000;

async function start(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    startExpirationJob();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

start();
