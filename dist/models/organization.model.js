import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';
class Organization extends Model {
    id;
    name;
    subdomain;
    stripeAccountId;
    settings;
    isPubliclyActive;
    // Timestamps
    createdAt;
    updatedAt;
}
Organization.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    subdomain: {
        type: new DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    stripeAccountId: {
        type: new DataTypes.STRING(255),
        allowNull: true,
    },
    settings: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    isPubliclyActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'organizations',
    sequelize,
    underscored: true
});
export { Organization };
//# sourceMappingURL=organization.model.js.map