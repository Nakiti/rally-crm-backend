import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';

interface EventAttributes {
    id: string;
    organizationId: string;
    title: string;
    description: string;
    location: string;
    eventDate: Date;
    isActive: boolean
}

class Event extends Model<EventAttributes> implements EventAttributes {
    public id!: string;
    public organizationId!: string;
    public title!: string;
    public description!: string;
    public location!: string;
    public eventDate!: Date;
    public isActive!: boolean

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Event.init({
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
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    eventDate: {
        type: DataTypes.TIME,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: "events",
    sequelize,
    underscored: true
})

export {Event}