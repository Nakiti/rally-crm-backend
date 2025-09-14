import { DataTypes, DATE, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';

interface DonationAttributes {
    id: string;
    organizationId: string;
    campaignId: string;
    donorAccountId: string;
    designationId: string;
    amount: number;
    stripeChargeId: string;
    status: string;
}

class Donation extends Model<DonationAttributes> implements DonationAttributes {
    public id!: string;
    public organizationId!: string;
    public campaignId!: string;
    public donorAccountId!: string;
    public designationId!: string;
    public amount!: number;
    public stripeChargeId!: string;
    public status!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Donation.init({
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
    campaignId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Campaign",
            key: "id"
        }
    },
    donorAccountId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "DonorAccount",
            key: "id"
        }
    },
    designationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Designation",
            key: "id"
        }
    },
    amount: {
        type: DataTypes.DECIMAL(2, 12),
        allowNull: true
    },
    stripeChargeId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: true
    }
}, {
    tableName: "donations",
    sequelize
})

export {Donation}