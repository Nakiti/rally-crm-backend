import { DataTypes, Model, UUIDV4, type Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface StaffAccountAttributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
}

type StaffAccountCreationAttributes = Optional<StaffAccountAttributes, 'id'>;

class StaffAccount extends Model<StaffAccountAttributes, StaffAccountCreationAttributes> implements StaffAccountAttributes {
    public id!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public passwordHash!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

StaffAccount.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: new DataTypes.STRING(255),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: "staff_accounts",
    sequelize,
    underscored: true
})

export {StaffAccount}