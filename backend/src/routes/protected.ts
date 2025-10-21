import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/user', requireAuth, (_req, res) => {
  return res.json({ message: 'Hello, authenticated user!' });
});

router.get('/admin', requireAuth, requireRole(['admin']), (_req, res) => {
  return res.json({ message: 'Admin access granted.' });
});

router.get('/manager', requireAuth, requireRole(['admin', 'manager']), (_req, res) => {
  return res.json({ message: 'Manager access granted.' });
});

export default router;


