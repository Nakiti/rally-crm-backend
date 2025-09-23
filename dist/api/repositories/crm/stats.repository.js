import { QueryTypes } from 'sequelize';
import sequelize from '../../../config/database.js';
export class StatsRepository {
    /**
     * Get stats summary for a specific organization and time period
     */
    async getStatsSummary(organizationId, period) {
        const dateRange = this.getDateRange(period);
        // Execute all queries in parallel for better performance
        const [activeCampaignsResult, totalDonationsResult, activeDonorsResult, retentionRateResult] = await Promise.all([
            this.getActiveCampaignsStats(organizationId, dateRange),
            this.getTotalDonationsStats(organizationId, dateRange),
            this.getActiveDonorsStats(organizationId, dateRange),
            this.getRetentionRateStats(organizationId, dateRange)
        ]);
        return {
            activeCampaigns: activeCampaignsResult,
            totalDonations: totalDonationsResult,
            activeDonors: activeDonorsResult,
            retentionRate: retentionRateResult
        };
    }
    /**
     * Get active campaigns count and change
     */
    async getActiveCampaignsStats(organizationId, dateRange) {
        const query = `
            WITH current_period AS (
                SELECT COUNT(*) as count
                FROM campaigns 
                WHERE organization_id = :organizationId 
                AND is_active = true
                AND created_at >= :currentStart
            ),
            previous_period AS (
                SELECT COUNT(*) as count
                FROM campaigns 
                WHERE organization_id = :organizationId 
                AND is_active = true
                AND created_at >= :previousStart 
                AND created_at < :currentStart
            )
            SELECT 
                c.count as current_value,
                p.count as previous_value,
                CASE 
                    WHEN p.count = 0 THEN 
                        CASE WHEN c.count > 0 THEN 1.0 ELSE 0.0 END
                    ELSE 
                        CAST((c.count - p.count) AS DECIMAL(10,2)) / CAST(p.count AS DECIMAL(10,2))
                END as change_rate
            FROM current_period c, previous_period p
        `;
        const result = await sequelize.query(query, {
            replacements: {
                organizationId,
                currentStart: dateRange.current,
                previousStart: dateRange.previous
            },
            type: QueryTypes.SELECT
        });
        const data = result[0];
        if (!data) {
            throw new Error('No data returned from active campaigns query');
        }
        // Ensure we have valid numeric values
        const value = Number(data.current_value) || 0;
        const change = Number(data.change_rate) || 0;
        console.log('Active campaigns data:', { raw: data, converted: { value, change } });
        return {
            value,
            change
        };
    }
    /**
     * Get total donations amount and change
     */
    async getTotalDonationsStats(organizationId, dateRange) {
        const query = `
            WITH current_period AS (
                SELECT COALESCE(SUM(amount), 0) as total
                FROM donations 
                WHERE organization_id = :organizationId 
                AND status = 'completed'
                AND created_at >= :currentStart
            ),
            previous_period AS (
                SELECT COALESCE(SUM(amount), 0) as total
                FROM donations 
                WHERE organization_id = :organizationId 
                AND status = 'completed'
                AND created_at >= :previousStart 
                AND created_at < :currentStart
            )
            SELECT 
                c.total as current_value,
                p.total as previous_value,
                CASE 
                    WHEN p.total = 0 THEN 
                        CASE WHEN c.total > 0 THEN 1.0 ELSE 0.0 END
                    ELSE 
                        CAST((c.total - p.total) AS DECIMAL(10,2)) / CAST(p.total AS DECIMAL(10,2))
                END as change_rate
            FROM current_period c, previous_period p
        `;
        const result = await sequelize.query(query, {
            replacements: {
                organizationId,
                currentStart: dateRange.current,
                previousStart: dateRange.previous
            },
            type: QueryTypes.SELECT
        });
        const data = result[0];
        if (!data) {
            throw new Error('No data returned from total donations query');
        }
        return {
            value: Math.round(Number(data.current_value)),
            change: Number(data.change_rate)
        };
    }
    /**
     * Get active donors count and change
     */
    async getActiveDonorsStats(organizationId, dateRange) {
        const query = `
            WITH current_period AS (
                SELECT COUNT(DISTINCT donor_account_id) as count
                FROM donations 
                WHERE organization_id = :organizationId 
                AND status = 'completed'
                AND created_at >= :currentStart
            ),
            previous_period AS (
                SELECT COUNT(DISTINCT donor_account_id) as count
                FROM donations 
                WHERE organization_id = :organizationId 
                AND status = 'completed'
                AND created_at >= :previousStart 
                AND created_at < :currentStart
            )
            SELECT 
                c.count as current_value,
                p.count as previous_value,
                CASE 
                    WHEN p.count = 0 THEN 
                        CASE WHEN c.count > 0 THEN 1.0 ELSE 0.0 END
                    ELSE 
                        CAST((c.count - p.count) AS DECIMAL(10,2)) / CAST(p.count AS DECIMAL(10,2))
                END as change_rate
            FROM current_period c, previous_period p
        `;
        const result = await sequelize.query(query, {
            replacements: {
                organizationId,
                currentStart: dateRange.current,
                previousStart: dateRange.previous
            },
            type: QueryTypes.SELECT
        });
        const data = result[0];
        if (!data) {
            throw new Error('No data returned from active donors query');
        }
        return {
            value: Number(data.current_value),
            change: Number(data.change_rate)
        };
    }
    /**
     * Get retention rate and change
     * Retention rate = (donors who donated in both periods) / (donors who donated in previous period)
     */
    async getRetentionRateStats(organizationId, dateRange) {
        const intervalType = this.getPeriodInterval(dateRange);
        const query = `
            WITH previous_donors AS (
                SELECT DISTINCT donor_account_id
                FROM donations 
                WHERE organization_id = :organizationId 
                AND status = 'completed'
                AND created_at >= :previousStart 
                AND created_at < :currentStart
            ),
            current_donors AS (
                SELECT DISTINCT donor_account_id
                FROM donations 
                WHERE organization_id = :organizationId 
                AND status = 'completed'
                AND created_at >= :currentStart
            ),
            retained_donors AS (
                SELECT COUNT(*) as count
                FROM previous_donors pd
                INNER JOIN current_donors cd ON pd.donor_account_id = cd.donor_account_id
            ),
            previous_donors_count AS (
                SELECT COUNT(*) as count
                FROM previous_donors
            ),
            current_retention AS (
                SELECT 
                    CASE 
                        WHEN pdc.count = 0 THEN 0.0
                        ELSE CAST(rd.count AS DECIMAL(10,2)) / CAST(pdc.count AS DECIMAL(10,2))
                    END as rate
                FROM retained_donors rd, previous_donors_count pdc
            ),
            -- Calculate previous period retention for comparison
            previous_previous_start AS (
                SELECT DATE_SUB(:previousStart, INTERVAL 1 ${intervalType}) as start_date
            ),
            previous_previous_donors AS (
                SELECT DISTINCT donor_account_id
                FROM donations 
                WHERE organization_id = :organizationId 
                AND status = 'completed'
                AND created_at >= (SELECT start_date FROM previous_previous_start)
                AND created_at < :previousStart
            ),
            previous_retained_donors AS (
                SELECT COUNT(*) as count
                FROM previous_previous_donors ppd
                INNER JOIN previous_donors pd ON ppd.donor_account_id = pd.donor_account_id
            ),
            previous_retention AS (
                SELECT 
                    CASE 
                        WHEN (SELECT COUNT(*) FROM previous_previous_donors) = 0 THEN 0.0
                        ELSE CAST(prd.count AS DECIMAL(10,2)) / CAST((SELECT COUNT(*) FROM previous_previous_donors) AS DECIMAL(10,2))
                    END as rate
                FROM previous_retained_donors prd
            )
            SELECT 
                cr.rate as current_value,
                pr.rate as previous_value,
                CASE 
                    WHEN pr.rate = 0 THEN 
                        CASE WHEN cr.rate > 0 THEN 1.0 ELSE 0.0 END
                    ELSE 
                        (cr.rate - pr.rate) / pr.rate
                END as change_rate
            FROM current_retention cr, previous_retention pr
        `;
        const result = await sequelize.query(query, {
            replacements: {
                organizationId,
                currentStart: dateRange.current,
                previousStart: dateRange.previous
            },
            type: QueryTypes.SELECT
        });
        const data = result[0];
        if (!data) {
            throw new Error('No data returned from retention rate query');
        }
        return {
            value: Math.round(Number(data.current_value) * 100) / 100, // Round to 2 decimal places
            change: Number(data.change_rate)
        };
    }
    /**
     * Get date range based on period
     */
    getDateRange(period) {
        const now = new Date();
        let currentStart;
        let previousStart;
        switch (period) {
            case 'week':
                currentStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
                previousStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14);
                break;
            case 'month':
                currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
                previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                break;
            case 'year':
                currentStart = new Date(now.getFullYear(), 0, 1);
                previousStart = new Date(now.getFullYear() - 1, 0, 1);
                break;
            default:
                throw new Error(`Invalid period: ${period}`);
        }
        return { current: currentStart, previous: previousStart };
    }
    /**
     * Get SQL interval string for period
     */
    getPeriodInterval(dateRange) {
        const diffMs = dateRange.current.getTime() - dateRange.previous.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays <= 7)
            return 'WEEK';
        if (diffDays <= 31)
            return 'MONTH';
        return 'YEAR';
    }
}
//# sourceMappingURL=stats.repository.js.map