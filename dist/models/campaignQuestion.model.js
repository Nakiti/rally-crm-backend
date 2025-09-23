import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';
class CampaignQuestion extends Model {
    id;
    campaignId;
    questionText;
    questionType;
    options;
    isRequired;
    displayOrder;
    createdAt;
    updatedAt;
}
CampaignQuestion.init({
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
    questionText: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    questionType: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    options: {
        type: DataTypes.JSON,
        allowNull: true
    },
    isRequired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: "campaign_questions",
    sequelize,
    underscored: true
});
export { CampaignQuestion };
//# sourceMappingURL=campaignQuestion.model.js.map