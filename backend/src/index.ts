import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import createHttpError from 'http-errors';
import { env } from './config/env.js';
import { connectToDatabase } from './db/mongoose.js';
import { securityHeaders, globalRateLimit } from './middleware/security.js';
import authRoutes from './routes/auth.js';
import csrfRoutes from './routes/csrf.js';
import protectedRoutes from './routes/protected.js';
import profileRoutes from './routes/profile.js';

async function bootstrap() {
  await connectToDatabase();

  const app = express();

  app.set('trust proxy', 1);
  app.use(securityHeaders);
  app.use(globalRateLimit);
  app.use(cors({ origin: env.corsOrigin, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use('/api/auth', authRoutes);
  app.use('/api/csrf', csrfRoutes);
  app.use('/api/protected', protectedRoutes);
  app.use('/api/profile', profileRoutes);

  app.use((_req, _res, next) => next(createHttpError(404, 'Not Found')));

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
  });

  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});


