import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';
class DonorAccount extends Model {
    id;
    organizationId;
    firstName;
    lastName;
    email;
    passwordHash;
    createdAt;
    updatedAt;
}
DonorAccount.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    organizationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "organizations",
            key: "id"
        }
    },
    firstName: {
        type: new DataTypes.STRING(255),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "donor_accounts",
    sequelize,
    underscored: true,
    indexes: [
        { fields: ['organizationId'], unique: false }
    ]
});
export { DonorAccount };
//# sourceMappingURL=donorAccount.model.js.map