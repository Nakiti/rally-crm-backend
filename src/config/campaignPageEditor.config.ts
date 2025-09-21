// Types for campaign page editor configuration
export type CampaignPageType = 'landing-page' | 'donation-form' | 'thank-you-page';

export type CampaignSectionType = 'hero' | 'story' | 'donationHeader' | 'donationButtons' | 'thankYouHeader';

export interface CampaignPageConfig {
  title: string;
  availableSections: CampaignSectionType[];
}

export type CampaignPageEditorConfig = {
  [K in CampaignPageType]: CampaignPageConfig;
}

export const campaignPageEditorConfig: CampaignPageEditorConfig = {
  'landing-page': {
    title: 'Campaign Landing Page',
    availableSections: ['hero', 'story'],
  },
  'donation-form': {
    title: 'Donation Form',
    availableSections: ['donationHeader', 'donationButtons'],
  },
  'thank-you-page': {
    title: 'Thank You Page',
    availableSections: ['thankYouHeader'],
  },
};