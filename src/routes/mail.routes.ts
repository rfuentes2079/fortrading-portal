import { Router } from 'express';
import { enviarMail } from '../controllers/mail.controller';

const router = Router();

router.route('/').post(enviarMail);

export default router;
