import { DataTypes, DATE, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';

interface StaffUserAttributes {
    id: number;
    organizationId: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role: string;
}

class StaffUser extends Model<StaffUserAttributes> implements StaffUserAttributes {
    public id!: number;
    public organizationId!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public passwordHash!: string;
    public role!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

StaffUser.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    organizationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Organizations",
            key: "id"
        }
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
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        defaultValue: 'editor'
    }
}, {
    tableName: "staff_users",
    sequelize
})