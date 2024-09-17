import { getSignup, postSignup } from '@/controllers/signupController.ts';
import { postSignupValidator } from '@/validators/signupValidators.ts';
import { Router } from 'express';
import { checkSchema } from 'express-validator';

const router = Router();

router.get('/', getSignup);
router.post('/', checkSchema(postSignupValidator), postSignup);

export default router;
