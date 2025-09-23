import { z } from 'zod';
export declare const createQuestionSchema: z.ZodObject<{
    params: z.ZodObject<{
        campaignId: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
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
        options: z.ZodOptional<z.ZodUnion<readonly [z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodString;
        }, z.core.$strip>>, z.ZodNull, z.ZodUndefined]>>;
        isRequired: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        displayOrder: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateQuestionSchema: z.ZodObject<{
    params: z.ZodObject<{
        campaignId: z.ZodString;
        questionId: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        questionText: z.ZodOptional<z.ZodString>;
        questionType: z.ZodOptional<z.ZodEnum<{
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
        }>>;
        options: z.ZodOptional<z.ZodUnion<readonly [z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodString;
        }, z.core.$strip>>, z.ZodNull, z.ZodUndefined]>>;
        isRequired: z.ZodOptional<z.ZodBoolean>;
        displayOrder: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getQuestionsForCampaignSchema: z.ZodObject<{
    params: z.ZodObject<{
        campaignId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getQuestionSchema: z.ZodObject<{
    params: z.ZodObject<{
        campaignId: z.ZodString;
        questionId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteQuestionSchema: z.ZodObject<{
    params: z.ZodObject<{
        campaignId: z.ZodString;
        questionId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=campaignQuestion.schemas.d.ts.map