import { DataTypes, Model, UUIDV4, type Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface DesignationAttributes {
    id: string;
    organizationId: string;
    name: string;
    description: string;
    isArchived: boolean;
    goalAmount: number;
}

interface DesignationCreationAttributes extends Optional<DesignationAttributes, "id"> {}
class Designation extends Model<DesignationAttributes, DesignationCreationAttributes> implements DesignationAttributes {
    public id!: string;
    public organizationId!: string;
    public name!: string;
    public description!: string;
    public goalAmount!: number;
    public isArchived!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Designation.init({
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
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    goalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    isArchived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: "designations",
    sequelize,
    underscored: true
})

export {Designation}