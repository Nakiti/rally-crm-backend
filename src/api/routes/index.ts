import { Router } from 'express';
import crmOrganizationRoutes from "./crm/organization.routes.js"
import crmStaffRoutes from "./crm/staff.routes.js"
import crmUserRoutes from "./crm/user.routes.js"
import crmCampaignRoutes from "./crm/campaign.routes.js"
import crmDonationRoutes from "./crm/donations.routes.js"
import crmDonorRoutes from "./crm/donors.routes.js"
import crmDesignationRoutes from "./crm/designation.routes.js"
import crmCampaignAvailableDesignationRoutes from "./crm/campaignAvailableDesignation.routes.js"
import crmOrganizationPageRoutes from "./crm/organizationPage.routes.js"
import publicOrganizationRoutes from "./public/organization.routes.js"
import publicOrganizationPageRoutes from "./public/organizationPage.routes.js"
import publicAuthRoutes from "./public/auth.routes.js"
import publicCampaignRoutes from "./public/campaign.routes.js"
import publicDonorAuthRoutes from "./public/donorAuth.routes.js"
import publicDonorRoutes from "./public/donor.routes.js"

const mainCrmRouter = Router();
mainCrmRouter.use("/organization", crmOrganizationRoutes)
mainCrmRouter.use("/staff", crmStaffRoutes)
mainCrmRouter.use("/", crmUserRoutes)
mainCrmRouter.use("/campaigns", crmCampaignRoutes)
mainCrmRouter.use("/donations", crmDonationRoutes)
mainCrmRouter.use("/donors", crmDonorRoutes)
mainCrmRouter.use("/designations", crmDesignationRoutes)
mainCrmRouter.use("/campaignAvailableDesignations", crmCampaignAvailableDesignationRoutes)
mainCrmRouter.use("/organization-pages", crmOrganizationPageRoutes)

const mainPublicRouter = Router()
mainPublicRouter.use("/organization", publicOrganizationRoutes)
mainPublicRouter.use("/organization", publicOrganizationPageRoutes)
mainPublicRouter.use("/auth", publicAuthRoutes)
mainPublicRouter.use("/campaign", publicCampaignRoutes)
mainPublicRouter.use("/donor-auth", publicDonorAuthRoutes)
mainPublicRouter.use("/donor", publicDonorRoutes)

export { mainCrmRouter, mainPublicRouter }