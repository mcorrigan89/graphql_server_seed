import { sign, verify } from 'jsonwebtoken';
import { serverConfig } from '@app/config';

export const createToken = <T extends object>(data: T) => {
  return sign(data, serverConfig.secret);
};

type TokenDecoded<T> = T & { iat?: string };

export const verifyToken = <T extends object>(token: string) => {
  return verify(token, serverConfig.secret) as TokenDecoded<T>;
};
