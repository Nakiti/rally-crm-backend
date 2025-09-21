
// Types for campaign section defaults configuration
export type CampaignSectionType = 'hero' | 'story' | 'donationHeader' | 'donationButtons' | 'thankYouHeader';

// Base section interface
export interface BaseSection {
  type: CampaignSectionType;
  enabled: boolean;
  required?: boolean;
  collapsed?: boolean;
}

// Section-specific prop interfaces
export interface HeroSectionProps {
  headline: string;
  buttonText: string;
}

export interface StorySectionProps {
  title: string;
}

export interface DonationHeaderSectionProps {
  headline: string;
  message: string;
}

export interface DonationButtonsSectionProps {
  suggestedAmounts: number[];
}

export interface ThankYouHeaderSectionProps {
  headline: string;
  message: string;
}

// Union type for all section props
export type SectionProps = 
  | HeroSectionProps 
  | StorySectionProps 
  | DonationHeaderSectionProps 
  | DonationButtonsSectionProps 
  | ThankYouHeaderSectionProps;

// Complete section interface
export interface CampaignSection extends BaseSection {
  props: SectionProps;
}

// Specific section interfaces
export interface HeroSection extends BaseSection {
  type: 'hero';
  required: true;
  collapsed: false;
  props: HeroSectionProps;
}

export interface StorySection extends BaseSection {
  type: 'story';
  required: true;
  collapsed: false;
  props: StorySectionProps;
}

export interface DonationHeaderSection extends BaseSection {
  type: 'donationHeader';
  props: DonationHeaderSectionProps;
}

export interface DonationButtonsSection extends BaseSection {
  type: 'donationButtons';
  props: DonationButtonsSectionProps;
}

export interface ThankYouHeaderSection extends BaseSection {
  type: 'thankYouHeader';
  props: ThankYouHeaderSectionProps;
}

// Union type for all campaign sections
export type CampaignSectionConfig = 
  | HeroSection 
  | StorySection 
  | DonationHeaderSection 
  | DonationButtonsSection 
  | ThankYouHeaderSection;

// Configuration object type
export interface CampaignSectionDefaults {
  hero: HeroSection;
  story: StorySection;
  donationHeader: DonationHeaderSection;
  donationButtons: DonationButtonsSection;
  thankYouHeader: ThankYouHeaderSection;
}

export const campaignSectionDefaults: CampaignSectionDefaults = {
  hero: {
    type: 'hero',
    enabled: true,
    required: true, // A section can be required by default
    collapsed: false,
    props: {
      headline: 'Your Campaign Title',
      buttonText: 'Donate Now'
    }
  },
  story: {
    type: 'story',
    enabled: true,
    required: true,
    collapsed: false,
    props: {
      title: 'Our Story'
    }
  },
  donationHeader: {
    type: 'donationHeader',
    enabled: true,
    props: {
      headline: "Donate!",
      message: "Your Support is Greatly Appreciated"
    }
  },
  donationButtons: {
    type: 'donationButtons',
    enabled: true,
    props: {
      suggestedAmounts: [25, 50, 100]
    }
  },
  thankYouHeader: {
    type: 'thankYouHeader',
    enabled: true,
    props: {
      headline: "Thank You",
      message: "Your Support is Greatly Appreciated!"
    }
  },
};