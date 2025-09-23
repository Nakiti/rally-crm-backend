import type { StatsSummary, StatsPeriod } from '../../../api/types/stats.types.js';
export declare class StatsRepository {
    /**
     * Get stats summary for a specific organization and time period
     */
    getStatsSummary(organizationId: string, period: StatsPeriod): Promise<StatsSummary>;
    /**
     * Get active campaigns count and change
     */
    private getActiveCampaignsStats;
    /**
     * Get total donations amount and change
     */
    private getTotalDonationsStats;
    /**
     * Get active donors count and change
     */
    private getActiveDonorsStats;
    /**
     * Get retention rate and change
     * Retention rate = (donors who donated in both periods) / (donors who donated in previous period)
     */
    private getRetentionRateStats;
    /**
     * Get date range based on period
     */
    private getDateRange;
    /**
     * Get SQL interval string for period
     */
    private getPeriodInterval;
}
//# sourceMappingURL=stats.repository.d.ts.map