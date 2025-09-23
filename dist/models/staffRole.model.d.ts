import { Model, Association, type BelongsToGetAssociationMixin, type BelongsToSetAssociationMixin, type BelongsToCreateAssociationMixin } from 'sequelize';
import { StaffAccount } from './staffAccount.model.js';
import { Organization } from './organization.model.js';
interface StaffRoleAttributes {
    staffAccountId: string;
    organizationId: string;
    role: string;
}
declare class StaffRole extends Model<StaffRoleAttributes> implements StaffRoleAttributes {
    staffAccountId: string;
    organizationId: string;
    role: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly staffAccount?: StaffAccount;
    readonly organization?: Organization;
    getStaffAccount: BelongsToGetAssociationMixin<StaffAccount>;
    setStaffAccount: BelongsToSetAssociationMixin<StaffAccount, string>;
    createStaffAccount: BelongsToCreateAssociationMixin<StaffAccount>;
    static associations: {
        staffAccount: Association<StaffRole, StaffAccount>;
        organization: Association<StaffRole, Organization>;
    };
}
export { StaffRole };
//# sourceMappingURL=staffRole.model.d.ts.map