import sequelize from '../config/database.js';
import { Organization } from './organization.model.js';
import { Campaign } from './campaign.model.js';
import { StaffAccount } from './staffAccount.model.js';
import { DonorAccount } from './donorAccount.model.js';
import { Donation } from './donation.model.js';
import { DonationAnswer } from './donationAnswer.model.js';
import { CampaignAvailableDesignation } from './campaignAvailableDesignation.model.js';
import { CampaignQuestion } from './campaignQuestion.model.js';
import { Event } from './event.model.js';
import { Attendee } from './attendee.model.js';
import { Designation } from './designation.model.js';
import { OrganizationPage } from './organizationPage.model.js';
import { StaffRole } from './staffRole.model.js';
declare const syncDb: () => Promise<void>;
export { sequelize, syncDb, Organization, StaffAccount, Campaign, Donation, DonationAnswer, DonorAccount, CampaignAvailableDesignation, CampaignQuestion, Event, Attendee, Designation, OrganizationPage, StaffRole, };
//# sourceMappingURL=index.d.ts.map