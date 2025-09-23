import { Model } from 'sequelize';
interface AttendeeAttributes {
    id: string;
    eventId: string;
    donorAccountId: string;
    status: string;
}
declare class Attendee extends Model<AttendeeAttributes> implements AttendeeAttributes {
    id: string;
    eventId: string;
    donorAccountId: string;
    status: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Attendee };
//# sourceMappingURL=attendee.model.d.ts.map