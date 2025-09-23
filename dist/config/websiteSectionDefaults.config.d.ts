export type WebsiteSectionType = 'hero' | 'main' | 'about' | 'impact' | 'featured' | 'banner' | 'story' | 'what' | 'why' | 'team' | 'donationButtons';
export interface BaseWebsiteSection {
    type: WebsiteSectionType;
    enabled: boolean;
    required?: boolean;
    collapsed?: boolean;
}
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
}
export interface WhatSectionProps {
}
export interface WhySectionProps {
}
export interface TeamSectionProps {
}
export interface DonationButtonsSectionProps {
}
export type WebsiteSectionProps = HeroSectionProps | MainSectionProps | AboutSectionProps | ImpactSectionProps | FeaturedSectionProps | BannerSectionProps | StorySectionProps | WhatSectionProps | WhySectionProps | TeamSectionProps | DonationButtonsSectionProps;
export interface WebsiteSection extends BaseWebsiteSection {
    props: WebsiteSectionProps;
}
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
export type WebsiteSectionConfig = HeroSection | MainSection | AboutSection | ImpactSection | FeaturedSection | BannerSection | StorySection | WhatSection | WhySection | TeamSection | DonationButtonsSection;
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
export declare const websiteSectionDefaults: WebsiteSectionDefaults;
//# sourceMappingURL=websiteSectionDefaults.config.d.ts.map