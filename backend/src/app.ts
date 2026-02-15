import express from "express";
import cors from "cors";

import reservationRoutes from "./routes/reservation.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/reservations", reservationRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

app.use(errorHandler);

export default app;

