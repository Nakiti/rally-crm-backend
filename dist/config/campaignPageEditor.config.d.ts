export type CampaignPageType = 'landing-page' | 'donation-form' | 'thank-you-page';
export type CampaignSectionType = 'hero' | 'story' | 'donationHeader' | 'donationButtons' | 'thankYouHeader';
export interface CampaignPageConfig {
    title: string;
    availableSections: CampaignSectionType[];
}
export type CampaignPageEditorConfig = {
    [K in CampaignPageType]: CampaignPageConfig;
};
export declare const campaignPageEditorConfig: CampaignPageEditorConfig;
//# sourceMappingURL=campaignPageEditor.config.d.ts.map