import { Request, Response, NextFunction } from 'express';
export declare class StatsController {
    private statsService;
    constructor();
    /**
     * Get stats summary for the authenticated organization
     */
    getStatsSummary: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=stats.controller.d.ts.map