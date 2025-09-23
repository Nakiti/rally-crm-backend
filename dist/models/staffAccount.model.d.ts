import { Model, type Optional } from 'sequelize';
interface StaffAccountAttributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
}
type StaffAccountCreationAttributes = Optional<StaffAccountAttributes, 'id'>;
declare class StaffAccount extends Model<StaffAccountAttributes, StaffAccountCreationAttributes> implements StaffAccountAttributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { StaffAccount };
//# sourceMappingURL=staffAccount.model.d.ts.map