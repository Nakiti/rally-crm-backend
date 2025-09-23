import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';
class Attendee extends Model {
    id;
    eventId;
    donorAccountId;
    status;
    createdAt;
    updatedAt;
}
Attendee.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    eventId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "events",
            key: "id"
        }
    },
    donorAccountId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "donor_accounts",
            key: "id"
        }
    },
    status: {
        type: DataTypes.ENUM('registered', 'attended', 'canceled'),
        allowNull: true
    },
}, {
    tableName: "attendees",
    sequelize,
    underscored: true
});
export { Attendee };
//# sourceMappingURL=attendee.model.js.map