import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';
class Event extends Model {
    id;
    organizationId;
    title;
    description;
    location;
    eventDate;
    isActive;
    createdAt;
    updatedAt;
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
    underscored: true,
    indexes: [
        { fields: ['organizationId'], unique: false }
    ]
});
export { Event };
//# sourceMappingURL=event.model.js.map