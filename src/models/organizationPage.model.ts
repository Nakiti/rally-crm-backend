import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';

interface OrganizationPageAttributes {
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object;
    isPublished: boolean
}

class OrganizationPage extends Model<OrganizationPageAttributes> implements OrganizationPageAttributes {
    public id!: string;
    public organizationId!: string;
    public contentConfig!: object;
    public pageType!: string;
    public isPublished!: boolean


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
    underscored: true
})

export {OrganizationPage}