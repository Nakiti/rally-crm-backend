import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
class StaffRole extends Model {
    staffAccountId;
    organizationId;
    role;
    createdAt;
    updatedAt;
    staffAccount;
    organization;
    // These give you methods like `staffRole.getStaffAccount()`
    getStaffAccount;
    setStaffAccount;
    createStaffAccount;
    static associations;
}
StaffRole.init({
    staffAccountId: {
        type: DataTypes.UUID,
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
    underscored: true,
    indexes: [
        { fields: ['organizationId'], unique: false }
    ]
});
export { StaffRole };
//# sourceMappingURL=staffRole.model.js.map