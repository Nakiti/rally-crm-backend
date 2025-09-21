import { ImageUpload } from '../../../models/imageUpload.model';
import { StaffSession } from '../../types/session.types';
import { ApiError } from '../../../utils/ApiError';

/**
 * A repository for handling all database operations for ImageUploads
 * in the context of the CRM.
 */
export class CrmUploadRepository {
  private user: StaffSession;

  constructor(user: StaffSession) {
    this.user = user;
  }

  /**
   * Creates a new record for a pending image upload.
   * @param url The final, permanent URL of the image in blob storage.
   */
  public async createPendingUpload(url: string): Promise<ImageUpload> {
    try {
      const newUpload = await ImageUpload.create({
        url,
        organizationId: this.user.organizationId,
        staffAccountId: this.user.id,
        status: 'pending',
      });
      return newUpload;
    } catch (error) {
      throw new ApiError(500, 'Failed to record image upload in database.');
    }
  }
}