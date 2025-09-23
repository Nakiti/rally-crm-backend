import { Model, type Optional } from 'sequelize';
interface DonorAccountAttributes {
    id: string;
    organizationId: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
}
interface DonorAccountCreationAttributes extends Optional<DonorAccountAttributes, "id"> {
}
declare class DonorAccount extends Model<DonorAccountAttributes, DonorAccountCreationAttributes> implements DonorAccountAttributes {
    id: string;
    organizationId: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { DonorAccount };
//# sourceMappingURL=donorAccount.model.d.ts.map