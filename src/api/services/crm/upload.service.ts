import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { StaffSession } from '../../types/session.types';
import { CrmUploadRepository } from '../../repositories/crm/upload.repository';
import { ApiError } from '../../../utils/ApiError';

// --- Azure Blob Storage Configuration ---
// These should be in your .env file
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

if (!accountName || !accountKey || !containerName) {
  throw new Error('Azure Storage configuration is missing from environment variables.');
}

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);

/**
 * Service to handle the business logic of generating a secure SAS URL for uploading.
 * @param fileInfo - The name and type of the file to be uploaded.
 * @param staffSession - The authenticated user performing the action.
 */
export const generateUploadUrlForStaff = async (
  fileInfo: { fileName: string; fileType: string },
  staffSession: StaffSession
) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // 1. Generate a unique file name to prevent collisions
    const uniqueFileName = `${uuidv4()}${path.extname(fileInfo.fileName)}`;
    const blockBlobClient = containerClient.getBlockBlobClient(uniqueFileName);

    // 2. Generate a short-lived, secure SAS URL with write permissions
    const sasUrl = await blockBlobClient.generateSasUrl({
      permissions: 'w' as any, // Write permission
      expiresOn: new Date(new Date().valueOf() + 300 * 1000), // Expires in 5 minutes
    });

    // 3. The final, permanent URL of the blob
    const permanentUrl = blockBlobClient.url;

    // 4. Record this pending upload in our database
    const uploadRepo = new CrmUploadRepository(staffSession);
    await uploadRepo.createPendingUpload(permanentUrl);

    // 5. Return both URLs to the frontend
    return {
      uploadUrl: sasUrl,
      accessUrl: permanentUrl,
    };
  } catch (error) {
    console.error('Failed to generate SAS URL:', error);
    throw new ApiError(500, 'Could not prepare file upload.');
  }
}; 