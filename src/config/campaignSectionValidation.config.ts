
export const campaignSectionValidation = {
  // Campaign Landing Page Sections
  hero: {
    requiredFields: ['headline', 'subheadline', 'imageUrl', 'buttonText'],
  },
  story: {
    requiredFields: ['title', 'message'],
  },
  donationButtons: {
    requiredFields: ['buttonOne', 'buttonTwo', 'buttonThree', 'buttonFour', 'buttonFive', 'buttonSix'],
  },
  // Campaign Donation Page Sections
  donationHeader: {
    requiredFields: ['headline', 'message'],
  },
  // Campaign Thank You Page Sections
  thankYouHeader: {
    requiredFields: ['headline', 'message'],
  },
  // Background sections currently have no configurable fields
  donationBackground: {
    requiredFields: [],
  },
  thankYouBackground: {
    requiredFields: [],
  },
};