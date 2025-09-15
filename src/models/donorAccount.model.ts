import { DataTypes, Model, UUIDV4, type Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface DonorAccountAttributes {
    id: string;
    organizationId: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
}

interface DonorAccountCreationAttributes extends Optional<DonorAccountAttributes, "id"> {}

class DonorAccount extends Model<DonorAccountAttributes, DonorAccountCreationAttributes> implements DonorAccountAttributes {
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
            model: "organizations",
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
    sequelize,
    underscored: true
})

export {DonorAccount}