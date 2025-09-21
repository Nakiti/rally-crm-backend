import { Router } from 'express';
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated';
import { validate } from '../../middleware/validate';
import { generateSasUrlSchema } from './upload.schemas';
import { generateSasUrl } from '../../controllers/crm/upload.controller';

const router = Router();

router.post('/generate-sas-url', isStaffAuthenticated, validate(generateSasUrlSchema), generateSasUrl);

export default router;