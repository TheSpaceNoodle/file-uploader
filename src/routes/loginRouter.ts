import { getLogin, getLogout, postLogin } from '@/controllers/loginController';
import { Router } from 'express';

const router = Router();

router.get('/', getLogin);
router.post('/', postLogin);

router.get('/logout', getLogout);

export default router;
