import { DonorAccount, Donation } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import { Op } from 'sequelize';
/**
 * A repository for handling all database operations for DonorAccounts
 * in the context of the CRM.
 */
export class CrmDonorRepository {
    staffSession;
    /**
     * Constructor that accepts a StaffSession object for security context.
     * @param staffSession - The authenticated staff session containing organization context
     */
    constructor(staffSession) {
        this.staffSession = staffSession;
    }
    /**
     * Fetches a paginated list of all DonorAccounts scoped to the staffSession.organizationId.
     * Allows filtering by name or email.
     * @param filters - Optional filters for name, email, page, and limit
     * @returns Promise with paginated donor accounts
     */
    async findAllForOrg(filters = {}) {
        // 1. Check if the repository was initialized with a user context.
        if (!this.staffSession || !this.staffSession.organizationId) {
            throw new ApiError(500, 'Repository must be initialized with a staff session for this operation.');
        }
        // 2. Set up pagination defaults
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const offset = (page - 1) * limit;
        // 3. Build where clause for organization scoping and optional filters
        const whereClause = {
            organizationId: this.staffSession.organizationId
        };
        // Add name filter (search in both firstName and lastName)
        if (filters.name) {
            whereClause[Op.or] = [
                { firstName: { [Op.iLike]: `%${filters.name}%` } },
                { lastName: { [Op.iLike]: `%${filters.name}%` } },
                {
                    [Op.and]: [
                        { firstName: { [Op.iLike]: `%${filters.name.split(' ')[0]}%` } },
                        { lastName: { [Op.iLike]: `%${filters.name.split(' ')[1] || ''}%` } }
                    ]
                }
            ];
        }
        // Add email filter
        if (filters.email) {
            whereClause.email = { [Op.iLike]: `%${filters.email}%` };
        }
        try {
            // 4. Get total count for pagination
            const total = await DonorAccount.count({
                where: whereClause
            });
            // 5. Fetch paginated results
            const donors = await DonorAccount.findAll({
                where: whereClause,
                order: [['createdAt', 'DESC']],
                limit,
                offset
            });
            // 6. Calculate total pages
            const totalPages = Math.ceil(total / limit);
            return {
                donors,
                total,
                page,
                limit,
                totalPages
            };
        }
        catch (error) {
            throw new ApiError(500, 'Failed to fetch donors from database.');
        }
    }
    /**
     * Fetches a single DonorAccount by its ID.
     * The WHERE clause checks for both the id and the staffSession.organizationId.
     * Eager loads the donor's associated Donations to build their complete giving history.
     * @param id - The ID of the donor account to fetch
     * @returns Promise with the donor account and their donations
     */
    async findByIdForOrg(id) {
        // 1. Check if the repository was initialized with a user context.
        if (!this.staffSession || !this.staffSession.organizationId) {
            throw new ApiError(500, 'Repository must be initialized with a staff session for this operation.');
        }
        // 2. Validate the ID format (basic UUID validation)
        if (!id || typeof id !== 'string') {
            throw new ApiError(400, 'Invalid donor ID provided.');
        }
        try {
            // 3. Fetch the donor account with eager loading of donations
            const donor = await DonorAccount.findOne({
                where: {
                    id: id,
                    organizationId: this.staffSession.organizationId
                },
                include: [
                    {
                        model: Donation,
                        as: 'donations',
                        order: [['createdAt', 'DESC']]
                    }
                ]
            });
            return donor;
        }
        catch (error) {
            throw new ApiError(500, 'Failed to fetch donor from database.');
        }
    }
}
//# sourceMappingURL=donor.repository.js.map