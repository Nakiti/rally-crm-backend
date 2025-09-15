import { DataTypes, Model, UUIDV4, Association, type BelongsToGetAssociationMixin, type BelongsToSetAssociationMixin, type BelongsToCreateAssociationMixin } from 'sequelize';

import sequelize from '../config/database.js';
import { StaffAccount } from './staffAccount.model.js';
import { Organization } from './organization.model.js';

interface StaffRoleAttributes {
    staffAccountId: string;
    organizationId: string;
    role: string;
}

class StaffRole extends Model<StaffRoleAttributes> implements StaffRoleAttributes {
    public staffAccountId!: string;
    public organizationId!: string;
    public role!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly staffAccount?: StaffAccount;
    public readonly organization?: Organization;
  
    // These give you methods like `staffRole.getStaffAccount()`
    public getStaffAccount!: BelongsToGetAssociationMixin<StaffAccount>;
    public setStaffAccount!: BelongsToSetAssociationMixin<StaffAccount, string>;
    public createStaffAccount!: BelongsToCreateAssociationMixin<StaffAccount>;
  
    public static associations: {
      staffAccount: Association<StaffRole, StaffAccount>;
      organization: Association<StaffRole, Organization>;
    };
}

StaffRole.init({
    staffAccountId: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        references: {
            model: "staff_accounts",
            key: "id"
        }
    },
    organizationId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "organizations",
            key: "id"
        }
    },
    role: {
        type: DataTypes.ENUM('admin', 'editor'),
        allowNull: false,
        defaultValue: 'editor'
    }
}, {
    tableName: "staff_roles",
    sequelize,
    underscored: true
})

export {StaffRole}