import { Organization } from "../../../models";
import { ApiError } from "../../../utils/ApiError";

/**
 * Fetches the public-facing data for an organization by its subdomain.
 * This function is optimized to only return non-sensitive data.
 */
export const getPublicOrganizationData = async (subdomain: string) => {
  const organization = await Organization.findOne({
    where: { subdomain },
    // Only select the fields that are safe for public display
    attributes: ['name', 'settings'],
  });

  if (!organization) {
    throw new ApiError(404, 'Organization not found');
  }
  return organization;
};