import { Router } from 'express';
import { issueCsrfToken } from '../middleware/csrf.js';

const router = Router();

router.get('/token', issueCsrfToken);

export default router;


