import sequelize from '../config/database';
import { Organization } from './organization.model';
import { Campaign } from './campaign.model';
import { StaffUser } from './staffUser.model';
import { DonorAccount } from './donorAccount.model';
import { Donation } from './donation.model';
import { DonationAnswer } from './donationAnswer.model';
import { CampaignAvailableDesignation } from './campaignAvailableDesignation.model';
import { CampaignQuestion } from './campaignQuestion.model';
import { Event } from './event.model';
import { Attendee } from './attendee.model';
import { Designation } from './designation.model';
import { OrganizationPage } from './organizationPage.model';

// === DEFINE ASSOCIATIONS ===

// ========== ORGANIZATION RELATIONSHIPS ==========
// Organization hasMany relationships
Organization.hasMany(StaffUser, { foreignKey: 'organizationId', as: 'staffUsers' });
Organization.hasMany(DonorAccount, { foreignKey: 'organizationId', as: 'donorAccounts' });
Organization.hasMany(Campaign, { foreignKey: 'organizationId', as: 'campaigns' });
Organization.hasMany(Donation, { foreignKey: 'organizationId', as: 'donations' });
Organization.hasMany(OrganizationPage, { foreignKey: 'organizationId', as: 'pages' });
Organization.hasMany(Designation, { foreignKey: 'organizationId', as: 'designations' });
Organization.hasMany(Event, { foreignKey: 'organizationId', as: 'events' });

// ========== CAMPAIGN RELATIONSHIPS ==========
// Campaign hasMany relationships
Campaign.hasMany(CampaignQuestion, { foreignKey: 'campaignId', as: 'questions' });
Campaign.hasMany(CampaignAvailableDesignation, { foreignKey: 'campaignId', as: 'availableDesignations' });
Campaign.hasMany(Donation, { foreignKey: 'campaignId', as: 'donations' });

// Campaign belongsTo relationships
Campaign.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
Campaign.belongsTo(Designation, { foreignKey: 'defaultDesignationId', as: 'defaultDesignation' });

// ========== DONATION RELATIONSHIPS ==========
// Donation hasMany relationships
Donation.hasMany(DonationAnswer, { foreignKey: 'donationId', as: 'answers' });

// Donation belongsTo relationships
Donation.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
Donation.belongsTo(Campaign, { foreignKey: 'campaignId', as: 'campaign' });
Donation.belongsTo(DonorAccount, { foreignKey: 'donorAccountId', as: 'donorAccount' });
Donation.belongsTo(Designation, { foreignKey: 'designationId', as: 'designation' });

// ========== EVENT RELATIONSHIPS ==========
// Event hasMany relationships
Event.hasMany(Attendee, { foreignKey: 'eventId', as: 'attendees' });

// Event belongsTo relationships
Event.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });

// ========== DONOR ACCOUNT RELATIONSHIPS ==========
// DonorAccount hasMany relationships
DonorAccount.hasMany(Donation, { foreignKey: 'donorAccountId', as: 'donations' });
DonorAccount.hasMany(Attendee, { foreignKey: 'donorAccountId', as: 'attendees' });

// DonorAccount belongsTo relationships
DonorAccount.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });

// ========== DESIGNATION RELATIONSHIPS ==========
// Designation hasMany relationships
Designation.hasMany(Campaign, { foreignKey: 'defaultDesignationId', as: 'defaultCampaigns' });
Designation.hasMany(Donation, { foreignKey: 'designationId', as: 'donations' });
Designation.hasMany(CampaignAvailableDesignation, { foreignKey: 'designationId', as: 'availableCampaigns' });

// Designation belongsTo relationships
Designation.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });

// ========== ATTENDEE RELATIONSHIPS ==========
// Attendee belongsTo relationships
Attendee.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
Attendee.belongsTo(DonorAccount, { foreignKey: 'donorAccountId', as: 'donorAccount' });

// ========== DONATION ANSWER RELATIONSHIPS ==========
// DonationAnswer belongsTo relationships
DonationAnswer.belongsTo(Donation, { foreignKey: 'donationId', as: 'donation' });
DonationAnswer.belongsTo(CampaignQuestion, { foreignKey: 'questionId', as: 'question' });

// ========== CAMPAIGN QUESTION RELATIONSHIPS ==========
// CampaignQuestion hasMany relationships
CampaignQuestion.hasMany(DonationAnswer, { foreignKey: 'questionId', as: 'answers' });

// CampaignQuestion belongsTo relationships
CampaignQuestion.belongsTo(Campaign, { foreignKey: 'campaignId', as: 'campaign' });

// ========== CAMPAIGN AVAILABLE DESIGNATION RELATIONSHIPS ==========
// CampaignAvailableDesignation belongsTo relationships
CampaignAvailableDesignation.belongsTo(Campaign, { foreignKey: 'campaignId', as: 'campaign' });
CampaignAvailableDesignation.belongsTo(Designation, { foreignKey: 'designationId', as: 'designation' });

// ========== STAFF USER RELATIONSHIPS ==========
// StaffUser belongsTo relationships
StaffUser.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });

// ========== ORGANIZATION PAGE RELATIONSHIPS ==========
// OrganizationPage belongsTo relationships
OrganizationPage.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });


// Sync all models that are defined on sequelize instance.
// In a production environment, you would use migrations instead of `sync`.
const syncDb = async () => {
  await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
  console.log("All models were synchronized successfully.");
};


// Export the configured sequelize instance and all models
export {
  sequelize,
  syncDb,
  Organization,
  StaffUser,
  Campaign,
  Donation,
  DonationAnswer,
  DonorAccount,
  CampaignAvailableDesignation,
  CampaignQuestion,
  Event,
  Attendee,
  Designation,
  OrganizationPage,
};
