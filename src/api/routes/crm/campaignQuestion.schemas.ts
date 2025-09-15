import { z } from 'zod';

// Common question types for campaign questions
const questionTypeEnum = z.enum([
  'text',
  'textarea', 
  'email',
  'phone',
  'number',
  'select',
  'radio',
  'checkbox',
  'date',
  'url'
], {
  message: 'Question type must be one of: text, textarea, email, phone, number, select, radio, checkbox, date, url'
});

// Schema for options array (for select/radio/checkbox types)
const optionsSchema = z.array(
  z.object({
    label: z.string().min(1, 'Option label is required'),
    value: z.string().min(1, 'Option value is required')
  })
).min(1, 'At least one option is required for select/radio/checkbox types');

// Schema for creating a new campaign question
export const createQuestionSchema = z.object({
  params: z.object({
    campaignId: z.string().uuid('A valid campaign ID is required')
  }),
  
  body: z.object({
    questionText: z.string()
      .min(1, 'Question text is required')
      .max(500, 'Question text must be less than 500 characters'),
    
    questionType: questionTypeEnum,
    
    options: z.union([
      optionsSchema,
      z.null(),
      z.undefined()
    ]).optional(),
    
    isRequired: z.boolean().optional().default(false),
    
    displayOrder: z.number()
      .int('Display order must be an integer')
      .min(0, 'Display order must be a positive number')
      .optional().default(0)
  }).refine((data) => {
    // For select, radio, and checkbox types, options are required
    if (['select', 'radio', 'checkbox'].includes(data.questionType)) {
      return data.options && Array.isArray(data.options) && data.options.length > 0;
    }
    return true;
  }, {
    message: 'Options are required for select, radio, and checkbox question types',
    path: ['options']
  })
});

// Schema for updating a campaign question
export const updateQuestionSchema = z.object({
  params: z.object({
    campaignId: z.string().uuid('A valid campaign ID is required'),
    questionId: z.string().uuid('A valid question ID is required')
  }),
  
  body: z.object({
    questionText: z.string()
      .min(1, 'Question text is required')
      .max(500, 'Question text must be less than 500 characters')
      .optional(),
    
    questionType: questionTypeEnum.optional(),
    
    options: z.union([
      optionsSchema,
      z.null(),
      z.undefined()
    ]).optional(),
    
    isRequired: z.boolean().optional(),
    
    displayOrder: z.number()
      .int('Display order must be an integer')
      .min(0, 'Display order must be a positive number')
      .optional()
  }).refine((data) => {
    // For select, radio, and checkbox types, options are required
    if (data.questionType && ['select', 'radio', 'checkbox'].includes(data.questionType)) {
      return data.options && Array.isArray(data.options) && data.options.length > 0;
    }
    return true;
  }, {
    message: 'Options are required for select, radio, and checkbox question types',
    path: ['options']
  })
});

// Schema for getting questions for a specific campaign
export const getQuestionsForCampaignSchema = z.object({
  params: z.object({
    campaignId: z.string().uuid('A valid campaign ID is required')
  })
});

// Schema for getting a specific question by ID
export const getQuestionSchema = z.object({
  params: z.object({
    campaignId: z.string().uuid('A valid campaign ID is required'),
    questionId: z.string().uuid('A valid question ID is required')
  })
});

// Schema for deleting a campaign question
export const deleteQuestionSchema = z.object({
  params: z.object({
    campaignId: z.string().uuid('A valid campaign ID is required'),
    questionId: z.string().uuid('A valid question ID is required')
  })
});
