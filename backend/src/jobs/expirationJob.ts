import { Op } from "sequelize";
import { Reservation } from "../models/reservation.model";

const EXPIRATION_CHECK_INTERVAL_MS = 60_000;

export const startExpirationJob = (): void => {
  setInterval(async () => {
    try {
      const now = new Date();

      const [updatedCount] = await Reservation.update(
        { status: "EXPIRED" },
        {
          where: {
            pinExpiresAt: {
              [Op.lt]: now
            },
            status: "PENDING"
          }
        }
      );

      if (updatedCount > 0) {
        // eslint-disable-next-line no-console
        console.log(`Auto-expired ${updatedCount} reservations`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error running expiration job:", error);
    }
  }, EXPIRATION_CHECK_INTERVAL_MS);
}

