import { Router } from "express";
import * as controller from "../controllers/reservation.controller";
import { Reservation } from "../models/reservation.model";

const router = Router();

router.post("/", controller.create);
router.post("/confirm", controller.confirm);

router.get("/", async (req, res) => {
  const reservations = await Reservation.findAll({
    order: [["reservationTime", "ASC"]]
  });
  res.json(reservations);
});

export default router;
