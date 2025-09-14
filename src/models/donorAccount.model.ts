import { DataTypes, DATE, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';

interface DonorAccountAttributes {
    id: string;
    organizationId: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
}

class DonorAccount extends Model<DonorAccountAttributes> implements DonorAccountAttributes {
    public id!: string;
    public organizationId!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public passwordHash!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

DonorAccount.init({
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
    }
}, {
    tableName: "donor_accounts",
    sequelize
})

export {DonorAccount}