import { Router } from 'express';
import { index } from '../controllers/index.controller';

const router = Router();

router.route('/').post(index);

export default router;
