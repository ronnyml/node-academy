import { sign, verify, SignOptions } from 'jsonwebtoken';
import { config } from '../config/config';

export const signToken = (payload: { userId: number; role: string }) => {
  return sign(payload, config.JWT_SECRET as string, {
    expiresIn: config.JWT_EXPIRES_IN
  } as SignOptions);
};

export const verifyToken = (token: string) => {
  return verify(token, config.JWT_SECRET as string) as { userId: number; role: string };
};
