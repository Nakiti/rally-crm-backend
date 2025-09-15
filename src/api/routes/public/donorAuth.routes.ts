import { Router } from 'express';
import { signUp, logIn } from '../../controllers/public/donorAuth.controller.js';
import { validate } from '../../middleware/validate.js';
import { donorSignupSchema, donorLoginSchema } from './donorAuth.schemas.js';

const router = Router();

/**
 * @route   POST /api/public/donor-auth/signup
 * @desc    Register a new donor account or claim an existing guest account
 * @access  Public
 */
router.post('/signup', validate(donorSignupSchema), signUp);

/**
 * @route   POST /api/public/donor-auth/login
 * @desc    Authenticate a donor and return JWT token
 * @access  Public
 */
router.post('/login', validate(donorLoginSchema), logIn);

export default router;
