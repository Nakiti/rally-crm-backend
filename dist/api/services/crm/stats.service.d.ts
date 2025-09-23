import type { StatsSummary, StatsPeriod } from '../../types/stats.types.js';
export declare class StatsService {
    private statsRepository;
    constructor();
    /**
     * Get stats summary for an organization
     */
    getStatsSummary(organizationId: string, period?: StatsPeriod): Promise<StatsSummary>;
    /**
     * Validate stats summary data structure
     */
    private validateStatsSummary;
}
//# sourceMappingURL=stats.service.d.ts.map