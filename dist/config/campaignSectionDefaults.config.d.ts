export type CampaignSectionType = 'hero' | 'story' | 'donationHeader' | 'donationButtons' | 'thankYouHeader';
export interface BaseSection {
    type: CampaignSectionType;
    enabled: boolean;
    required?: boolean;
    collapsed?: boolean;
}
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
export type SectionProps = HeroSectionProps | StorySectionProps | DonationHeaderSectionProps | DonationButtonsSectionProps | ThankYouHeaderSectionProps;
export interface CampaignSection extends BaseSection {
    props: SectionProps;
}
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
export type CampaignSectionConfig = HeroSection | StorySection | DonationHeaderSection | DonationButtonsSection | ThankYouHeaderSection;
export interface CampaignSectionDefaults {
    hero: HeroSection;
    story: StorySection;
    donationHeader: DonationHeaderSection;
    donationButtons: DonationButtonsSection;
    thankYouHeader: ThankYouHeaderSection;
}
export declare const campaignSectionDefaults: CampaignSectionDefaults;
//# sourceMappingURL=campaignSectionDefaults.config.d.ts.map