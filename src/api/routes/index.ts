import { Router } from 'express';
import organizationRoutes from "./crm/organization.routes"
// import campaignRoutes from './campaign.routes';
// import authRoutes from './auth.routes';
// ... import other route files as you create them

const router = Router();

// Any request starting with /api/campaigns will be handled by the campaignRoutes file.
// router.use('/campaigns', campaignRoutes);

// // Any request starting with /api/auth will be handled by the authRoutes file.
// router.use('/auth', authRoutes);
router.use("/organization", organizationRoutes)

// ... and so on for other resources

export default router;