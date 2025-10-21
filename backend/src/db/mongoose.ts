import mongoose from 'mongoose';
import { env } from '../config/env.js';

export async function connectToDatabase(): Promise<typeof mongoose> {
  mongoose.set('strictQuery', true);
  return mongoose.connect(env.mongoUrl, {
    // options can be tuned here
  });
}


