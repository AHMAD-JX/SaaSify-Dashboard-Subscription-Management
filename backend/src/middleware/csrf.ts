import type { RequestHandler } from 'express';
import crypto from 'crypto';
import { env } from '../config/env.js';

const CSRF_COOKIE = 'csrf_token';

export const issueCsrfToken: RequestHandler = (_req, res) => {
  const token = crypto.randomBytes(32).toString('hex');
  const isProd = env.nodeEnv === 'production';
  res.cookie(CSRF_COOKIE, token, {
    httpOnly: false,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 2 * 60 * 60 * 1000,
  });
  res.json({ csrfToken: token });
};

export const requireCsrf: RequestHandler = (req, res, next) => {
  // Double-submit cookie method: header must equal cookie
  const header = (req.get('x-csrf-token') || req.body?.csrfToken) as string | undefined;
  const cookie = req.cookies?.[CSRF_COOKIE] as string | undefined;
  if (!header || !cookie || header !== cookie) {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  next();
};


