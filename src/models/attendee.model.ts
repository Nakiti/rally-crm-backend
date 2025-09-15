import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';

interface AttendeeAttributes {
    id: string;
    eventId: string;
    donorAccountId: string;
    status: string;

}

class Attendee extends Model<AttendeeAttributes> implements AttendeeAttributes {
    public id!: string;
    public eventId!: string;
    public donorAccountId!: string;
    public status!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
})

export {Attendee}