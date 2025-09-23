import jwt from 'jsonwebtoken';
import { DonorAccount } from '../../models/index.js';
import { ApiError } from '../../utils/ApiError.js';
/**
 * Middleware to authenticate donor users via a JWT.
 * It verifies the token, confirms the donor account exists and is associated with the organization,
 * and attaches the donor session context to the request.
 */
export const isDonorAuthenticated = async (req, res, next) => {
    try {
        // 1. Check for and extract the token
        const token = req.cookies.auth_token;
        if (!token) {
            throw new ApiError(401, 'Authentication token is required.');
        }
        // 2. Verify the token and decode the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 3. Fetch the DonorAccount from the database to ensure the user still exists
        const donorAccount = await DonorAccount.findOne({
            where: {
                id: decoded.donorAccountId,
                organizationId: decoded.organizationId,
            },
        });
        // 4. Check if the donor account exists and is associated with the organization
        if (!donorAccount) {
            throw new ApiError(403, 'Access denied. Donor account not found or not associated with this organization.');
        }
        // 5. Attach the DonorSession object to req.user
        (req).user = {
            donorAccountId: donorAccount.id,
            organizationId: donorAccount.organizationId,
        };
        // 6. Pass control to the next handler
        next();
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(new ApiError(401, 'Invalid or expired authentication token.'));
        }
        next(error);
    }
};
//# sourceMappingURL=isDonorAuthenticated.js.map