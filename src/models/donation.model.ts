import { DataTypes, Model, UUIDV4, type Optional } from 'sequelize';
import sequelize from '../config/database.js';
import type { Campaign } from './campaign.model.js';
import type { Designation } from './designation.model.js';
import type { DonorAccount } from './donorAccount.model.js';
import type { Organization } from './organization.model.js';
import type { DonationAnswer } from './donationAnswer.model.js';

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

interface DonationCreationAttributes extends Optional<DonationAttributes, "id"> {}

class Donation extends Model<DonationAttributes, DonationCreationAttributes> implements DonationAttributes {
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

    // Association properties
    public campaign?: Campaign;
    public designation?: Designation;
    public donorAccount?: DonorAccount;
    public organization?: Organization;
    public answers?: DonationAnswer[];
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
            model: "organizations",
            key: "id"
        }
    },
    campaignId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "campaigns",
            key: "id"
        }
    },
    donorAccountId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "donor_accounts",
            key: "id"
        }
    },
    designationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "designations",
            key: "id"
        } 
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    stripeChargeId: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        allowNull: true
    }
}, {
    tableName: "donations",
    sequelize,
    underscored: true,
    indexes: [
        {
        unique: true,
        fields: ['stripe_charge_id'],
        name: 'unique_stripe_charge_id'
        }
    ]
})

export {Donation}