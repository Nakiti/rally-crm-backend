import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';
class OrganizationPage extends Model {
    id;
    organizationId;
    contentConfig;
    pageType;
    isPublished;
    createdAt;
    updatedAt;
}
OrganizationPage.init({
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
    contentConfig: {
        type: DataTypes.JSON,
        allowNull: true
    },
    pageType: {
        type: DataTypes.ENUM('landing', 'about'),
        allowNull: false,
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: "organization_pages",
    sequelize,
    underscored: true,
    indexes: [
        { fields: ['organizationId'], unique: false }
    ]
});
export { OrganizationPage };
//# sourceMappingURL=organizationPage.model.js.map