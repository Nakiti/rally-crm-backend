import { Organization } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import { Op } from 'sequelize';
//refactor to not need id paramter and just use userId
/**
 * A repository for handling all database operations for Organizations
 * in the context of the CRM.
 */
export class CrmOrganizationRepository {
    user;
    // The constructor now accepts an optional user.
    // For 'create', it's not needed. For secure fetches/updates, it is.
    constructor(user = null) {
        this.user = user;
    }
    /**
     * Creates a new organization.
     * @param organizationData - The data for the new organization.
     */
    async create(organizationData) {
        // The service layer should validate the data before it gets here.
        // The repository's job is to handle the database interaction.
        try {
            const newOrganization = await Organization.create(organizationData);
            return newOrganization;
        }
        catch (error) {
            // Handle potential database errors, specifically the unique constraint on the subdomain.
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new ApiError(409, 'An organization with this subdomain already exists.');
            }
            // For any other database error, throw a generic server error.
            throw new ApiError(500, 'Failed to create organization in database.');
        }
    }
    /**
     * Finds an organization by ID with authorization check.
     * Only allows access to the organization the authenticated staff member belongs to.
     */
    async findById(id) {
        // 1. Check if the repository was initialized with a user context.
        if (!this.user || !this.user.organizationId) {
            throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
        }
        // 2. Ensure the user can only access their own organization.
        if (this.user.organizationId !== id) {
            throw new ApiError(403, 'Access denied. You can only access your own organization.');
        }
        // 3. Perform the database query.
        const organization = await Organization.findByPk(id);
        return organization;
    }
    /**
     * Updates an organization with authorization check.
     * Only allows updating the organization the authenticated staff member belongs to.
     */
    async update(id, updateData) {
        // 1. Check if the repository was initialized with a user context.
        if (!this.user || !this.user.organizationId) {
            throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
        }
        // 2. Ensure the user can only update their own organization.
        if (this.user.organizationId !== id) {
            throw new ApiError(403, 'Access denied. You can only update your own organization.');
        }
        // 3. Find the organization first.
        const organization = await Organization.findByPk(id);
        if (!organization) {
            throw new ApiError(404, 'Organization not found.');
        }
        // 4. If subdomain is being updated, check for uniqueness.
        if (updateData.subdomain && updateData.subdomain !== organization.subdomain) {
            const existingOrganization = await Organization.findOne({
                where: {
                    subdomain: updateData.subdomain,
                    id: { [Op.ne]: id }
                }
            });
            if (existingOrganization) {
                throw new ApiError(409, 'An organization with this subdomain already exists.');
            }
        }
        // 5. Update the organization.
        try {
            await organization.update(updateData);
            return organization;
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new ApiError(409, 'An organization with this subdomain already exists.');
            }
            throw new ApiError(500, 'Failed to update organization in database.');
        }
    }
    /**
     * Deletes an organization with authorization check.
     * Only allows deleting the organization the authenticated staff member belongs to.
     */
    async delete(id) {
        // 1. Check if the repository was initialized with a user context.
        if (!this.user || !this.user.organizationId) {
            throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
        }
        // 2. Ensure the user can only delete their own organization.
        if (this.user.organizationId !== id) {
            throw new ApiError(403, 'Access denied. You can only delete your own organization.');
        }
        // 3. Find the organization first.
        const organization = await Organization.findByPk(id);
        if (!organization) {
            throw new ApiError(404, 'Organization not found.');
        }
        // 4. Delete the organization.
        try {
            await organization.destroy();
        }
        catch (error) {
            throw new ApiError(500, 'Failed to delete organization from database.');
        }
    }
    /**
     * Finds all organizations (admin only - no authorization check needed for creation context).
     * This method doesn't require user context as it's typically used in admin scenarios.
     */
    async findAll() {
        try {
            const organizations = await Organization.findAll({
                order: [['createdAt', 'DESC']]
            });
            return organizations;
        }
        catch (error) {
            throw new ApiError(500, 'Failed to fetch organizations from database.');
        }
    }
}
//# sourceMappingURL=organization.repository.js.map