import { DataTypes, DATE, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';

interface OrganizationPageAttributes {
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object;

}

class OrganizationPage extends Model<OrganizationPageAttributes> implements OrganizationPageAttributes {
    public id!: string;
    public organizationId!: string;
    public contentConfig!: object;
    public pageType!: string;

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
            model: "Organizations",
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
    }
}, {
    tableName: "organization_pages",
    sequelize
})

export {OrganizationPage}