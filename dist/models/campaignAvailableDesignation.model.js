import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';
class CampaignAvailableDesignation extends Model {
    id;
    campaignId;
    designationId;
    createdAt;
    updatedAt;
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
    sequelize,
    underscored: true
});
export { CampaignAvailableDesignation };
//# sourceMappingURL=campaignAvailableDesignation.model.js.map