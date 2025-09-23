import { StatsRepository } from '../../repositories/crm/stats.repository.js';
import type { StatsSummary, StatsPeriod } from '../../types/stats.types.js';
import { ApiError } from '../../../utils/ApiError.js';

export class StatsService {
    private statsRepository: StatsRepository;

    constructor() {
        this.statsRepository = new StatsRepository();
    }

    /**
     * Get stats summary for an organization
     */
    async getStatsSummary(organizationId: string, period: StatsPeriod = 'month'): Promise<StatsSummary> {
        // console.log("from the stats summary", organizationId, period)

        try {
            // Validate period
            if (!['week', 'month', 'year'].includes(period)) {
                throw new ApiError(400, 'Invalid period. Must be one of: week, month, year');
            }

            // Validate organizationId
            if (!organizationId || typeof organizationId !== 'string') {
                throw new ApiError(400, 'Valid organizationId is required');
            }

            // Get stats from repository
            const stats = await this.statsRepository.getStatsSummary(organizationId, period);

            // Validate that we got valid data
            if (!stats || typeof stats !== 'object') {
                console.log("asdasdsad")
                throw new ApiError(500, 'Failed to retrieve stats data');
            }

            // Ensure all required fields are present and valid
            this.validateStatsSummary(stats);

            return stats;
        } catch (error) {
            
            if (error instanceof ApiError) {
                throw error;
            }
            
            // Log unexpected errors
            console.error('Error in StatsService.getStatsSummary:', error);
            throw new ApiError(500, 'Internal server error while retrieving stats');
        }
    }

    /**
     * Validate stats summary data structure
     */
    private validateStatsSummary(stats: StatsSummary): void {
        const requiredFields = ['activeCampaigns', 'totalDonations', 'activeDonors', 'retentionRate'];
        
        for (const field of requiredFields) {
            if (!(field in stats)) {
                throw new ApiError(500, `Missing required field: ${field}`);
            }
            
            const fieldData = stats[field as keyof StatsSummary];
            if (!fieldData || typeof fieldData !== 'object') {
                throw new ApiError(500, `Invalid data structure for field: ${field}`);
            }
            
            console.log(`Validating ${field}:`, {
                value: fieldData.value,
                valueType: typeof fieldData.value,
                change: fieldData.change,
                changeType: typeof fieldData.change
            });
            
            if (typeof fieldData.value !== 'number' || typeof fieldData.change !== 'number') {
                throw new ApiError(500, `Invalid data types for field: ${field} - value: ${typeof fieldData.value}, change: ${typeof fieldData.change}`);
            }
            
            // Validate value ranges
            if (fieldData.value < 0) {
                throw new ApiError(500, `Invalid negative value for field: ${field}`);
            }
            
            // For retention rate, ensure it's between 0 and 1
            if (field === 'retentionRate' && (fieldData.value < 0 || fieldData.value > 1)) {
                throw new ApiError(500, 'Retention rate must be between 0 and 1');
            }
        }
    }
}
