// Types for website page editor configuration
export type WebsitePageType = 'landing-page' | 'about-page';

export type WebsiteSectionType = 'banner' | 'main' | 'about' | 'impact' | 'featured' | 'hero' | 'story' | 'what' | 'why' | 'team' | 'donationButtons';

// Base section interface for website sections
export interface BaseWebsiteSection {
  type: WebsiteSectionType;
  enabled: boolean;
  required?: boolean;
  collapsed?: boolean;
}

// Section-specific prop interfaces
export interface HeroSectionProps {
  headline: string;
  buttonText: string;
}

export interface MainSectionProps {
  title: string;
}

export interface AboutSectionProps {
  title: string;
}

export interface ImpactSectionProps {
  title: string;
}

export interface FeaturedSectionProps {
  title: string;
}

export interface BannerSectionProps {
  headline: string;
  message: string;
}

export interface StorySectionProps {
  // Empty props for now, can be extended later
}

export interface WhatSectionProps {
  // Empty props for now, can be extended later
}

export interface WhySectionProps {
  // Empty props for now, can be extended later
}

export interface TeamSectionProps {
  // Empty props for now, can be extended later
}

export interface DonationButtonsSectionProps {
  // Empty props for now, can be extended later
}

// Union type for all website section props
export type WebsiteSectionProps = 
  | HeroSectionProps 
  | MainSectionProps 
  | AboutSectionProps 
  | ImpactSectionProps 
  | FeaturedSectionProps 
  | BannerSectionProps 
  | StorySectionProps 
  | WhatSectionProps 
  | WhySectionProps 
  | TeamSectionProps 
  | DonationButtonsSectionProps;

// Complete website section interface
export interface WebsiteSection extends BaseWebsiteSection {
  props: WebsiteSectionProps;
}

// Website page configuration interface
export interface WebsitePageConfig {
  title: string;
  availableSections: WebsiteSectionType[];
}

// Website page editor configuration interface
export type WebsitePageEditorConfig = {
  [K in WebsitePageType]: WebsitePageConfig;
}

export const websitePageEditorConfig: WebsitePageEditorConfig = {
  'landing-page': {
    title: 'Landing Page',
    availableSections: ['banner', 'main', 'about', 'impact', 'featured'],
  },
  'about-page': {
    title: 'About Page',
    availableSections: ['banner', 'story', 'what', 'why', 'team'],
  }
};