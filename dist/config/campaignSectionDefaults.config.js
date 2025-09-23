export const campaignSectionDefaults = {
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
//# sourceMappingURL=campaignSectionDefaults.config.js.map