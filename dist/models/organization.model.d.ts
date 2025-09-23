import { Model, type Optional } from 'sequelize';
interface OrganizationAttributes {
    id: string;
    name: string;
    subdomain: string;
    stripeAccountId?: string;
    settings?: object;
    isPubliclyActive: boolean;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
type OrganizationCreationAttributes = Optional<OrganizationAttributes, 'id'>;
declare class Organization extends Model<OrganizationAttributes, OrganizationCreationAttributes> implements OrganizationAttributes {
    id: string;
    name: string;
    subdomain: string;
    stripeAccountId: string;
    settings: object;
    isPubliclyActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Organization };
//# sourceMappingURL=organization.model.d.ts.map