export type StatsPeriod = 'week' | 'month' | 'year';
export interface StatsValue {
    value: number;
    change: number;
}
export interface StatsSummary {
    activeCampaigns: StatsValue;
    totalDonations: StatsValue;
    activeDonors: StatsValue;
    retentionRate: StatsValue;
}
//# sourceMappingURL=stats.types.d.ts.map