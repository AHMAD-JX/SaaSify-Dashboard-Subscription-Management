import { Router } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { env } from '../config/env.js';
import { loginRateLimit, noCache } from '../middleware/security.js';

const router = Router();

function signToken(id: string, role: string) {
  return jwt.sign({ sub: id, role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

function setAuthCookie(res: any, token: string) {
  const isProd = env.nodeEnv === 'production';
  res.cookie(env.cookieName, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(['admin', 'manager', 'user']).optional(),
});

router.post('/signup', noCache, async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid payload', issues: parsed.error.flatten() });
  const { email, password, name, role } = parsed.data;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already in use' });
  const user = await User.create({ email, password, name, role: role || 'user' });
  const token = signToken(user.id, user.role);
  setAuthCookie(res, token);
  return res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post('/login', loginRateLimit, noCache, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid credentials' });
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken(user.id, user.role);
  setAuthCookie(res, token);
  return res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
});

router.post('/logout', (req, res) => {
  res.clearCookie(env.cookieName, { path: '/' });
  return res.status(204).send();
});

router.get('/me', (req, res) => {
  const token = req.cookies?.[env.cookieName];
  if (!token) return res.status(200).json({ user: null });
  try {
    const decoded: any = jwt.verify(token, env.jwtSecret);
    return res.json({ user: { id: decoded.sub, role: decoded.role } });
  } catch {
    return res.status(200).json({ user: null });
  }
});

// OAuth placeholders
router.get('/oauth/:provider/start', (_req, res) => {
  return res.status(501).json({ message: 'OAuth not implemented yet' });
});
router.get('/oauth/:provider/callback', (_req, res) => {
  return res.status(501).json({ message: 'OAuth not implemented yet' });
});

export default router;


