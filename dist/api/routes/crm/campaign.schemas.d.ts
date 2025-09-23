import { z } from 'zod';
export declare const createCampaignSchema: z.ZodObject<{
    body: z.ZodObject<{
        defaultDesignationId: z.ZodString;
        internalName: z.ZodString;
        externalName: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        slug: z.ZodOptional<z.ZodString>;
        goalAmount: z.ZodNumber;
        icon: z.ZodOptional<z.ZodString>;
        pageConfig: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateCampaignSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        defaultDesignationId: z.ZodOptional<z.ZodString>;
        internalName: z.ZodOptional<z.ZodString>;
        externalName: z.ZodOptional<z.ZodString>;
        slug: z.ZodOptional<z.ZodString>;
        goalAmount: z.ZodOptional<z.ZodNumber>;
        icon: z.ZodOptional<z.ZodString>;
        pageConfig: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getCampaignByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteCampaignSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updatePageConfigSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        pageConfig: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getPageConfigSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateCampaignDesignationsSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        designationIds: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateCampaignQuestionsSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        questions: z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            questionText: z.ZodString;
            questionType: z.ZodEnum<{
                number: "number";
                email: "email";
                url: "url";
                date: "date";
                text: "text";
                textarea: "textarea";
                phone: "phone";
                select: "select";
                radio: "radio";
                checkbox: "checkbox";
            }>;
            options: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodString;
            }, z.core.$strip>>>;
            isRequired: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            displayOrder: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getTopCampaignsSchema: z.ZodObject<{
    query: z.ZodObject<{
        period: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
            week: "week";
            month: "month";
            year: "year";
        }>>>;
        limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const publishCampaignSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        pageConfig: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=campaign.schemas.d.ts.map