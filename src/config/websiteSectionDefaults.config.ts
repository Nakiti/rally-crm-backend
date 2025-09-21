
// Types for website section defaults configuration
export type WebsiteSectionType = 'hero' | 'main' | 'about' | 'impact' | 'featured' | 'banner' | 'story' | 'what' | 'why' | 'team' | 'donationButtons';

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

// Specific section interfaces
export interface HeroSection extends BaseWebsiteSection {
  type: 'hero';
  required: true;
  collapsed: false;
  props: HeroSectionProps;
}

export interface MainSection extends BaseWebsiteSection {
  type: 'main';
  required: true;
  collapsed: false;
  props: MainSectionProps;
}

export interface AboutSection extends BaseWebsiteSection {
  type: 'about';
  required: true;
  collapsed: false;
  props: AboutSectionProps;
}

export interface ImpactSection extends BaseWebsiteSection {
  type: 'impact';
  required: true;
  collapsed: false;
  props: ImpactSectionProps;
}

export interface FeaturedSection extends BaseWebsiteSection {
  type: 'featured';
  required: true;
  collapsed: false;
  props: FeaturedSectionProps;
}

export interface BannerSection extends BaseWebsiteSection {
  type: 'banner';
  props: BannerSectionProps;
}

export interface StorySection extends BaseWebsiteSection {
  type: 'story';
  props: StorySectionProps;
}

export interface WhatSection extends BaseWebsiteSection {
  type: 'what';
  props: WhatSectionProps;
}

export interface WhySection extends BaseWebsiteSection {
  type: 'why';
  props: WhySectionProps;
}

export interface TeamSection extends BaseWebsiteSection {
  type: 'team';
  props: TeamSectionProps;
}

export interface DonationButtonsSection extends BaseWebsiteSection {
  type: 'donationButtons';
  props: DonationButtonsSectionProps;
}

// Union type for all website sections
export type WebsiteSectionConfig = 
  | HeroSection 
  | MainSection 
  | AboutSection 
  | ImpactSection 
  | FeaturedSection 
  | BannerSection 
  | StorySection 
  | WhatSection 
  | WhySection 
  | TeamSection
  | DonationButtonsSection;

// Configuration object type
export interface WebsiteSectionDefaults {
  hero: HeroSection;
  main: MainSection;
  about: AboutSection;
  impact: ImpactSection;
  featured: FeaturedSection;
  banner: BannerSection;
  story: StorySection;
  what: WhatSection;
  why: WhySection;
  team: TeamSection;
}

export const websiteSectionDefaults: WebsiteSectionDefaults = {
    hero: { 
        type: 'hero', 
        enabled: true, 
        required: true, 
        collapsed: false, 
        props: { headline: 'Your Campaign Title', buttonText: 'Donate Now' } 
    },
    main:  { 
        type: 'main', 
        enabled: true, 
        required: true, 
        collapsed: false, 
        props: { title: 'Our Story' } 
    },
    about:  { 
        type: 'about', 
        enabled: true, 
        required: true, 
        collapsed: false, 
        props: { title: 'Our Story' } 
    },
    impact:  { 
        type: 'impact', 
        enabled: true, 
        required: true, 
        collapsed: false, 
        props: { title: 'Our Story' } 
    },
    featured:  { 
        type: 'featured', 
        enabled: true, 
        required: true, 
        collapsed: false, 
        props: { title: 'Our Story' } 
    },
    banner: { 
        type: 'banner', 
        enabled: true, 
        props: { headline: "Donate!", message: "Your Support is Greatly Appreciated" } 
    },
    story:  { 
        type: 'story', 
        enabled: true, 
        props: {} 
    },
    what:  { 
        type: 'what', 
        enabled: true, 
        props: {} 
    },
    why:  { 
        type: 'why', 
        enabled: true, 
        props: {} 
    },
    team:  { 
        type: 'team', 
        enabled: true, 
        props: {} 
    },
}