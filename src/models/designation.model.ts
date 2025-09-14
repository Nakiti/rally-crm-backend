import { DataTypes, DATE, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';

interface DesignationAttributes {
    id: string;
    organizationId: string;
    name: string;
    description: string;
    isArchived: boolean;
    goalAmount: number;
}

class Designation extends Model<DesignationAttributes> implements DesignationAttributes {
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
            model: "Organizations",
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
        type: DataTypes.DECIMAL(2, 12),
        allowNull: true
    },
    isArchived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: "designations",
    sequelize
})

export {Designation}