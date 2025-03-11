import { hash, compare } from 'bcrypt';
import logger from '../config/logger';

const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 8;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    if (!password || typeof password !== 'string') {
      throw new Error('Password must be a non-empty string');
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
    }

    const hashedPassword = await hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    logger?.error('Password hashing failed:', error);
    throw error instanceof Error
      ? error
      : new Error('Failed to hash password');
  }
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    if (!password || typeof password !== 'string') {
      throw new Error('Password must be a non-empty string');
    }

    if (!hash || typeof hash !== 'string') {
      throw new Error('Hash must be a non-empty string');
    }

    const isMatch = await compare(password, hash);
    return isMatch;
  } catch (error) {
    logger?.error('Password comparison failed:', error);
    throw error instanceof Error
      ? error
      : new Error('Failed to compare passwords');
  }
};