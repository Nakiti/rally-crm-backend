import { Model } from 'sequelize';
interface EventAttributes {
    id: string;
    organizationId: string;
    title: string;
    description: string;
    location: string;
    eventDate: Date;
    isActive: boolean;
}
declare class Event extends Model<EventAttributes> implements EventAttributes {
    id: string;
    organizationId: string;
    title: string;
    description: string;
    location: string;
    eventDate: Date;
    isActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Event };
//# sourceMappingURL=event.model.d.ts.map