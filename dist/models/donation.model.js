import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';
class Donation extends Model {
    id;
    organizationId;
    campaignId;
    donorAccountId;
    designationId;
    amount;
    stripeChargeId;
    status;
    createdAt;
    updatedAt;
    // Association properties
    campaign;
    designation;
    donorAccount;
    organization;
    answers;
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
        unique: true
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
        { fields: ['organizationId'], unique: false }
    ]
});
export { Donation };
//# sourceMappingURL=donation.model.js.map