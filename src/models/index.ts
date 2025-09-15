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

// === DEFINE ASSOCIATIONS ===

// ========== ORGANIZATION RELATIONSHIPS ==========
// Organization hasMany relationships
Organization.hasMany(DonorAccount, { foreignKey: 'organizationId', as: 'donorAccounts' });
Organization.hasMany(Campaign, { foreignKey: 'organizationId', as: 'campaigns' });
Organization.hasMany(Donation, { foreignKey: 'organizationId', as: 'donations' });
Organization.hasMany(OrganizationPage, { foreignKey: 'organizationId', as: 'pages' });
Organization.hasMany(Designation, { foreignKey: 'organizationId', as: 'designations' });
Organization.hasMany(Event, { foreignKey: 'organizationId', as: 'events' });
Organization.hasMany(StaffRole, { foreignKey: 'organizationId', as: 'staffRoles' });

// Organization many-to-many with StaffAccount through StaffRole
Organization.belongsToMany(StaffAccount, { 
  through: StaffRole, 
  foreignKey: 'organizationId',
  otherKey: 'staffAccountId',
  as: 'staffAccounts' 
});

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

// ========== STAFF ACCOUNT RELATIONSHIPS ==========
// StaffAccount hasMany relationships
StaffAccount.hasMany(StaffRole, { foreignKey: 'staffAccountId', as: 'staffRoles' });

// StaffAccount many-to-many with Organization through StaffRole
StaffAccount.belongsToMany(Organization, { 
  through: StaffRole, 
  foreignKey: 'staffAccountId',
  otherKey: 'organizationId',
  as: 'organizations' 
});

// ========== ORGANIZATION PAGE RELATIONSHIPS ==========
// OrganizationPage belongsTo relationships
OrganizationPage.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });

// ========== STAFF ROLE RELATIONSHIPS ==========
// StaffRole belongsTo relationships
StaffRole.belongsTo(StaffAccount, { foreignKey: 'staffAccountId', as: 'staffAccount' });
StaffRole.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });

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
  StaffAccount,
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
  StaffRole,
};
