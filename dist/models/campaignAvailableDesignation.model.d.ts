import { Model, type Optional } from 'sequelize';
interface CampaignAvailableDesignationAttributes {
    id: string;
    campaignId: string;
    designationId: string;
}
export interface CampaignAvailableDesignationCreationAttributes extends Optional<CampaignAvailableDesignationAttributes, "id"> {
}
declare class CampaignAvailableDesignation extends Model<CampaignAvailableDesignationAttributes, CampaignAvailableDesignationCreationAttributes> implements CampaignAvailableDesignationAttributes {
    id: string;
    campaignId: string;
    designationId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { CampaignAvailableDesignation };
//# sourceMappingURL=campaignAvailableDesignation.model.d.ts.map