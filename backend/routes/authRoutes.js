import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema, loginSchema, validatePassword } from "../validators/authValidator.js";

const router = express.Router();

router.post('/register', validate(registerSchema), validatePassword, register);
router.post('/login', validate(loginSchema), login);

export default router;