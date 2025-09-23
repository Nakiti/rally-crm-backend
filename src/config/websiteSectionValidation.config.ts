// This file defines the "rules of completeness" for each section type.

export const websiteSectionValidation = {
  hero: {
    // For a 'hero' section to be complete, the 'headline' prop must have a value.
    requiredFields: ['headline', 'description'],
  },
  story: {
    requiredFields: ['title', 'text'],
  },
  donationFields: {
    requiredFields: ['suggestedAmounts'],
  },
  // Organization About Page Sections
  team: {
    // Team section currently has no configurable fields
    requiredFields: [],
  },
  what: {
    requiredFields: ['title', 'text'],
  },
  why: {
    requiredFields: ['title', 'text'],
  },
  // Organization Landing Page Sections
  about: {
    requiredFields: ['title', 'text', 'aboutImage'],
  },
  banner: {
    requiredFields: ['headline', 'message', 'bannerImage'],
  },
  featured: {
    requiredFields: ['headlineOne', 'descriptionOne', 'imageOne', 'headlineTwo', 'descriptionTwo', 'imageTwo', 'headlineThree', 'descriptionThree', 'imageThree'],
  },
  impact: {
    requiredFields: ['title', 'text', 'impactImage'],
  },
  main: {
    requiredFields: ['title', 'text'],
  },
};