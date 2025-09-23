import { ImageUpload } from '../../../models/imageUpload.model';
import { StaffSession } from '../../types/session.types';
/**
 * A repository for handling all database operations for ImageUploads
 * in the context of the CRM.
 */
export declare class CrmUploadRepository {
    private user;
    constructor(user: StaffSession);
    /**
     * Creates a new record for a pending image upload.
     * @param url The final, permanent URL of the image in blob storage.
     */
    createPendingUpload(url: string): Promise<ImageUpload>;
}
//# sourceMappingURL=upload.repository.d.ts.map