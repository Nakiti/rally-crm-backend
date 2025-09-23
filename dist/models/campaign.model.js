import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';
class Campaign extends Model {
    id;
    organizationId;
    defaultDesignationId;
    internalName;
    externalName;
    slug;
    goalAmount;
    icon;
    pageConfig;
    settings;
    isActive;
    createdAt;
    updatedAt;
}
Campaign.init({
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
    defaultDesignationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "designations",
            key: "id"
        }
    },
    internalName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    externalName: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    goalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    icon: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    pageConfig: {
        type: DataTypes.JSON,
        allowNull: true
    },
    settings: {
        type: DataTypes.JSON,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: "campaigns",
    sequelize,
    underscored: true,
    indexes: [
        { fields: ['organizationId'], unique: false }
    ]
});
export { Campaign };
//# sourceMappingURL=campaign.model.js.map