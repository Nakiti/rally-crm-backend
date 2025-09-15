import { DataTypes, Model, UUIDV4, type Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface CampaignAttributes {
    id: string;
    organizationId: string;
    defaultDesignationId?: string;
    internalName: string;
    externalName?: string;
    slug?: string;
    goalAmount?: number;
    icon?: string;
    pageConfig?: object;
    isActive: boolean

}

export interface CampaignCreationAttributes extends Optional<CampaignAttributes, "id"> {}

class Campaign extends Model<CampaignAttributes, CampaignCreationAttributes> implements CampaignAttributes {
    public id!: string;
    public organizationId!: string;
    public defaultDesignationId!: string;
    public internalName!: string;
    public externalName!: string;
    public slug!: string;
    public goalAmount!: number;
    public icon!: string;
    public pageConfig!: object;
    public isActive!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
        type: DataTypes.DECIMAL(2, 12),
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
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: "campaigns",
    sequelize,
    underscored: true
})

export {Campaign}