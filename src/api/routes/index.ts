import { Router } from 'express';
import crmOrganizationRoutes from "./crm/organization.routes"
// import campaignRoutes from './campaign.routes';
// import authRoutes from './auth.routes';
// ... import other route files as you create them

const mainCrmRouter = Router();
mainCrmRouter.use("/organization", crmOrganizationRoutes)


const mainPublicRouter = Router()
mainPublicRouter.use("/organization", null)

export { mainCrmRouter, mainPublicRouter }