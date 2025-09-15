import { Router } from 'express';
import { 
  signUp, 
  logIn, 
  createSession 
} from '../../controllers/public/auth.controller.js';
import { validate } from '../../middleware/validate.js';
import { 
  signupSchema, 
  loginSchema, 
  sessionSchema 
} from './auth.schemas.js';

const router = Router();

/**
 * @route   POST /api/public/auth/signup
 * @desc    Create a new organization with the first admin user
 * @access  Public
 */
router.post('/signup', validate(signupSchema), signUp);

/**
 * @route   POST /api/public/auth/login
 * @desc    Authenticate a user and return their organization memberships
 * @access  Public
 */
router.post('/login', validate(loginSchema), logIn);

/**
 * @route   POST /api/public/auth/session
 * @desc    Create a session JWT for a specific organization
 * @access  Public
 */
router.post('/session', validate(sessionSchema), createSession);

export default router;
