import { Organization } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
/**
 * A repository for handling public-facing organization data.
 * This repository only returns safe, non-sensitive information.
 */
export class PublicOrganizationRepository {
    /**
     * Finds an organization by subdomain and returns only public information.
     * @param subdomain - The organization's subdomain
     * @returns Public organization data or null if not found
     */
    async findBySubdomain(subdomain) {
        try {
            const organization = await Organization.findOne({
                where: { subdomain },
                attributes: ['id', 'name', 'subdomain'], // Only select public fields
            });
            if (!organization) {
                return null;
            }
            return {
                id: organization.id,
                name: organization.name,
                subdomain: organization.subdomain,
            };
        }
        catch (error) {
            throw new ApiError(500, 'Failed to fetch organization from database.');
        }
    }
    /**
     * Finds an organization by ID and returns only public information.
     * @param id - The organization's ID
     * @returns Public organization data or null if not found
     */
    async findById(id) {
        try {
            const organization = await Organization.findByPk(id, {
                attributes: ['id', 'name', 'subdomain'], // Only select public fields
            });
            if (!organization) {
                return null;
            }
            return {
                id: organization.id,
                name: organization.name,
                subdomain: organization.subdomain,
            };
        }
        catch (error) {
            throw new ApiError(500, 'Failed to fetch organization from database.');
        }
    }
}
//# sourceMappingURL=organization.repository.js.map