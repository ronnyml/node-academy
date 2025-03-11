import { sign, verify, SignOptions, JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';
import logger from '../config/logger';
import { StringValue } from 'ms';

interface TokenPayload {
  userId: number;
  role: string;
  iat?: number;
  exp?: number;
}

export const signToken = (
  payload: TokenPayload,
  options: Partial<SignOptions> = { expiresIn: config.JWT_EXPIRES_IN as number | StringValue }
): string => {
  try {
    if (!config.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }

    if (!payload.userId || !payload.role) {
      throw new Error('Invalid payload: userId and role are required');
    }

    const signOptions: SignOptions = {
      ...options,
      expiresIn: options.expiresIn ?? (config.JWT_EXPIRES_IN as number | StringValue),
    };

    return sign(payload, config.JWT_SECRET, signOptions);
  } catch (error) {
    logger?.error('Token signing failed:', error);
    throw error instanceof Error
      ? error
      : new Error('Failed to sign token');
  }
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid token: must be a non-empty string');
    }

    if (!config.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }

    const decoded = verify(token, config.JWT_SECRET) as JwtPayload & TokenPayload;
    if (!decoded.userId || !decoded.role) {
      throw new Error('Invalid token payload');
    }

    return decoded;
  } catch (error) {
    logger?.error('Token verification failed:', error);
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    }
    throw error instanceof Error
      ? error
      : new Error('Failed to verify token');
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = verifyToken(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp ? decoded.exp < now : false;
  } catch (error) {
    return true;
  }
};