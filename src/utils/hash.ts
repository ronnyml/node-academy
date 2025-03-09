import { hash, compare } from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) => {
  return await hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};
