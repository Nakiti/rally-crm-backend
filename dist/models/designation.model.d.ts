import { Model, type Optional } from 'sequelize';
interface DesignationAttributes {
    id: string;
    organizationId: string;
    name: string;
    description: string;
    isArchived: boolean;
    goalAmount: number;
}
interface DesignationCreationAttributes extends Optional<DesignationAttributes, "id"> {
}
declare class Designation extends Model<DesignationAttributes, DesignationCreationAttributes> implements DesignationAttributes {
    id: string;
    organizationId: string;
    name: string;
    description: string;
    goalAmount: number;
    isArchived: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Designation };
//# sourceMappingURL=designation.model.d.ts.map