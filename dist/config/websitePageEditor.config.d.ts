export type WebsitePageType = 'landing-page' | 'about-page';
export type WebsiteSectionType = 'banner' | 'main' | 'about' | 'impact' | 'featured' | 'hero' | 'story' | 'what' | 'why' | 'team' | 'donationButtons';
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
export interface WebsitePageConfig {
    title: string;
    availableSections: WebsiteSectionType[];
}
export type WebsitePageEditorConfig = {
    [K in WebsitePageType]: WebsitePageConfig;
};
export declare const websitePageEditorConfig: WebsitePageEditorConfig;
//# sourceMappingURL=websitePageEditor.config.d.ts.map