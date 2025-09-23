import { Router } from 'express';
import { StatsController } from '../../controllers/crm/stats.controller.js';
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated.js';
import { validate } from '../../middleware/validate.js';
import { statsSchemas } from './stats.schemas.js';

const router = Router();
const statsController = new StatsController();

/**
 * @route GET /api/crm/stats/summary
 * @desc Get stats summary for dashboard KPIs
 * @access Staff only
 * @query period - Time period: week, month, or year (default: month)
 */
router.get('/summary', isStaffAuthenticated, validate(statsSchemas.getStatsSummary.query), statsController.getStatsSummary);

export default router;
