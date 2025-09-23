import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';
export class ImageUpload extends Model {
    id;
    organizationId;
    staffAccountId;
    url;
    status;
    createdAt;
    updatedAt;
}
ImageUpload.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    organizationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'organization_id',
    },
    staffAccountId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'staff_account_id',
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed'),
        allowNull: false,
        defaultValue: 'pending',
    },
}, {
    tableName: 'image_uploads',
    sequelize,
    underscored: true,
});
//# sourceMappingURL=imageUpload.model.js.map