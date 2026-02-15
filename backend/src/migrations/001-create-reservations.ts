import type { QueryInterface } from "sequelize";
import { DataTypes } from "sequelize";

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  const tableExists = await queryInterface
    .describeTable("reservations")
    .then(() => true)
    .catch(() => false);

  if (tableExists) {
    return;
  }

  await queryInterface.createTable("reservations", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
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
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("PENDING", "CONFIRMED", "EXPIRED"),
      allowNull: false,
      defaultValue: "PENDING"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  const tableExists = await queryInterface
    .describeTable("reservations")
    .then(() => true)
    .catch(() => false);

  if (!tableExists) {
    return;
  }

  await queryInterface.dropTable("reservations");
}

