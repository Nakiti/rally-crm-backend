import { Model, type Optional } from 'sequelize';
interface CampaignAttributes {
    id: string;
    organizationId: string;
    defaultDesignationId?: string;
    internalName: string;
    externalName?: string;
    slug?: string;
    goalAmount?: number;
    icon?: string;
    pageConfig?: object;
    settings?: object;
    isActive: boolean;
}
export interface CampaignCreationAttributes extends Optional<CampaignAttributes, "id"> {
}
declare class Campaign extends Model<CampaignAttributes, CampaignCreationAttributes> implements CampaignAttributes {
    id: string;
    organizationId: string;
    defaultDesignationId: string;
    internalName: string;
    externalName: string;
    slug: string;
    goalAmount: number;
    icon: string;
    pageConfig: object;
    settings: object;
    isActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Campaign };
//# sourceMappingURL=campaign.model.d.ts.map