import { z } from 'zod';

// Schema for creating a new campaign available designation
export const createCampaignAvailableDesignationSchema = z.object({
  params: z.object({
    campaignId: z.string().uuid('A valid campaign ID is required')
  }),
  body: z.object({
    designationId: z.string().uuid('A valid designation ID is required')
  })
});

// Schema for getting campaign available designations by campaign
export const getCampaignAvailableDesignationsSchema = z.object({
  params: z.object({
    campaignId: z.string().uuid('A valid campaign ID is required')
  })
});

// Schema for getting a specific campaign available designation by ID
export const getCampaignAvailableDesignationSchema = z.object({
  params: z.object({
    campaignId: z.string().uuid('A valid campaign ID is required'),
    id: z.string().uuid('A valid campaign available designation ID is required')
  })
});

// Schema for deleting a campaign available designation
export const deleteCampaignAvailableDesignationSchema = z.object({
  params: z.object({
    campaignId: z.string().uuid('A valid campaign ID is required'),
    id: z.string().uuid('A valid campaign available designation ID is required')
  })
});
