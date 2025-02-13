import express from 'express';
import { login, logout } from '../Controllers/Auth.controller';
import { validateLoginInput } from '../validations/auth.validation';

const router = express.Router();

router.post('/login', validateLoginInput, login);
router.post('/logout', logout);

export default router;