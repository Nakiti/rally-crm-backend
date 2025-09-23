import { Model, type Optional } from 'sequelize';
interface CampaignQuestionAttributes {
    id: string;
    campaignId: string;
    questionText: string;
    questionType: string;
    options: object;
    isRequired: boolean;
    displayOrder: number;
}
interface CampaignQuestionCreationAttributes extends Optional<CampaignQuestionAttributes, "id"> {
}
declare class CampaignQuestion extends Model<CampaignQuestionAttributes, CampaignQuestionCreationAttributes> implements CampaignQuestionAttributes {
    id: string;
    campaignId: string;
    questionText: string;
    questionType: string;
    options: object;
    isRequired: boolean;
    displayOrder: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { CampaignQuestion };
//# sourceMappingURL=campaignQuestion.model.d.ts.map