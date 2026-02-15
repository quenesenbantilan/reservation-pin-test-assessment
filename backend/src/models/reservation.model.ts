import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reservationTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pinCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    pinActivatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pinExpiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pinConfirmedAt: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM("PENDING", "CONFIRMED", "EXPIRED"),
      defaultValue: "PENDING"
    }
  },
  {
    sequelize,
    tableName: "reservations",
    timestamps: true
  }
);
