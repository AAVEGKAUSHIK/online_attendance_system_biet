import { body, validationResult } from 'express-validator';
import { RequestHandler } from 'express';

export const validateLoginInput: RequestHandler[] = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
    

];