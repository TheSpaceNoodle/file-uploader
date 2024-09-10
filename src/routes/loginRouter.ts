import { getLogin, postLogin } from '@/controllers/loginController';
import { Router } from 'express';

const router = Router();

router.get('/', getLogin);
router.post('/', postLogin);

export default router;
