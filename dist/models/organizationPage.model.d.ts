import { Model } from 'sequelize';
interface OrganizationPageAttributes {
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object;
    isPublished: boolean;
}
declare class OrganizationPage extends Model<OrganizationPageAttributes> implements OrganizationPageAttributes {
    id: string;
    organizationId: string;
    contentConfig: object;
    pageType: string;
    isPublished: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { OrganizationPage };
//# sourceMappingURL=organizationPage.model.d.ts.map