import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';
class StaffAccount extends Model {
    id;
    firstName;
    lastName;
    email;
    passwordHash;
    createdAt;
    updatedAt;
}
StaffAccount.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: new DataTypes.STRING(255),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: "staff_accounts",
    sequelize,
    underscored: true
});
export { StaffAccount };
//# sourceMappingURL=staffAccount.model.js.map