import type { Request, Response, NextFunction } from 'express';
interface PublicRequest extends Request {
    subdomain?: string;
}
/**
 * Get a public campaign by slug
 * GET /api/public/campaigns/:slug
 */
export declare const getPublicCampaign: (req: PublicRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Create a Stripe checkout session for a campaign donation
 * POST /api/public/campaigns/:slug/checkout
 */
export declare const createDonationCheckout: (req: PublicRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=campaign.controller.d.ts.map