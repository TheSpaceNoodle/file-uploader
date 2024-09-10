import { getSignup, postSignup } from '@/controllers/signupController';
import { postSignupValidator } from '@/controllers/validators/signupValidators';
import { Router } from 'express';
import { checkSchema } from 'express-validator';

const router = Router();

router.get('/', getSignup);
router.post('/', checkSchema(postSignupValidator), postSignup);

export default router;
