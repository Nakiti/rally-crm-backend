import { Model, Optional } from 'sequelize';
interface ImageUploadAttributes {
    id: string;
    organizationId: string;
    staffAccountId: string;
    url: string;
    status: 'pending' | 'confirmed';
}
type ImageUploadCreationAttributes = Optional<ImageUploadAttributes, 'id'>;
export declare class ImageUpload extends Model<ImageUploadAttributes, ImageUploadCreationAttributes> {
    id: string;
    organizationId: string;
    staffAccountId: string;
    url: string;
    status: 'pending' | 'confirmed';
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export {};
//# sourceMappingURL=imageUpload.model.d.ts.map