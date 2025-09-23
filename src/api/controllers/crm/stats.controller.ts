import { Request, Response, NextFunction } from 'express';
import { StatsService } from '../../services/crm/stats.service.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { StatsPeriod } from '../../types/stats.types.js';

export class StatsController {
    private statsService: StatsService;

    constructor() {
        this.statsService = new StatsService();
    }

    /**
     * Get stats summary for the authenticated organization
     */
    getStatsSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Get organization ID from authenticated user
            const organizationId = req.user?.organizationId;
            // console.log("org id", organizationId)
            
            if (!organizationId) {
                throw new ApiError(401, 'Organization ID not found in request');
            }

            // Get period from query parameters, default to 'month'
            const period = (req.query.period as StatsPeriod) || 'month';

            // Validate period parameter
            if (period && !['week', 'month', 'year'].includes(period)) {
                throw new ApiError(400, 'Invalid period parameter. Must be one of: week, month, year');
            }

            // Get stats from service
            const stats = await this.statsService.getStatsSummary(organizationId, period);

            // Return success response
            res.status(200).json({
                success: true,
                data: stats,
                message: 'Stats summary retrieved successfully'
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    };
}
