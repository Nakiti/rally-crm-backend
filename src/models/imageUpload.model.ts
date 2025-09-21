import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';

interface ImageUploadAttributes {
  id: string;
  organizationId: string;
  staffAccountId: string;
  url: string;
  status: 'pending' | 'confirmed';
}

type ImageUploadCreationAttributes = Optional<ImageUploadAttributes, 'id'>;

export class ImageUpload extends Model<ImageUploadAttributes, ImageUploadCreationAttributes> {
  public id!: string;
  public organizationId!: string;
  public staffAccountId!: string;
  public url!: string;
  public status!: 'pending' | 'confirmed';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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