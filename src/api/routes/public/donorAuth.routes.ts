import { Router } from 'express';
import { signUp, logIn, logOut } from '../../controllers/public/donorAuth.controller.js';
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

/**
 * @route   POST /api/public/donor-auth/logout
 * @desc    Log out the current donor by clearing the authentication cookie
 * @access  Public
 */
router.post('/logout', logOut);

export default router;

