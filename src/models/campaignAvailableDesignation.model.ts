import { DataTypes, DATE, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';

interface CampaignAvailableDesignationAttributes {
    id: string;
    campaignId: string;
    designationId: string;
}

class CampaignAvailableDesignation extends Model<CampaignAvailableDesignationAttributes> implements CampaignAvailableDesignationAttributes {
    public id!: string;
    public campaignId!: string;
    public designationId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CampaignAvailableDesignation.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    campaignId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "campaigns",
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
    }
}, {
    tableName: "campaign_available_designations",
    sequelize
})

export {CampaignAvailableDesignation}