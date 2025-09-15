import { DataTypes, Model, UUIDV4, type Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface CampaignQuestionAttributes {
    id: string;
    campaignId: string;
    questionText: string;
    questionType: string;
    options: object 
    isRequired: boolean;
    displayOrder: number;
}

interface CampaignQuestionCreationAttributes extends Optional<CampaignQuestionAttributes, "id"> {}
class CampaignQuestion extends Model<CampaignQuestionAttributes, CampaignQuestionCreationAttributes> implements CampaignQuestionAttributes {
    public id!: string;
    public campaignId!: string;
    public questionText!: string;
    public questionType!: string;
    public options!: object;
    public isRequired!: boolean;
    public displayOrder!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
})

export {CampaignQuestion}