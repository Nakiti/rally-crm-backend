import { StaffSession } from '../../types/session.types';
/**
 * Service to handle the business logic of generating a secure SAS URL for uploading.
 * @param fileInfo - The name and type of the file to be uploaded.
 * @param staffSession - The authenticated user performing the action.
 */
export declare const generateUploadUrlForStaff: (fileInfo: {
    fileName: string;
    fileType: string;
}, staffSession: StaffSession) => Promise<{
    uploadUrl: string;
    accessUrl: string;
}>;
//# sourceMappingURL=upload.service.d.ts.map