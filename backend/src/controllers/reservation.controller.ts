import type { Request, Response, NextFunction } from "express";
import * as service from "../services/reservation.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reservation = await service.createReservation(req.body);
    res.json(reservation);
  } catch (error) {
    next(error);
  }
};

export const confirm = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await service.confirmReservation(req.body.pin);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

