import { Request, RequestHandler } from 'express';
import { verifyToken } from './token';

export const getToken = (req: Request) => req.headers.authorization;

export interface DecodedAuthToken {
  id: string;
}
export interface AuthenticatedRequest extends Request {
  decodedToken?: DecodedAuthToken;
}

export const tokenCheck: RequestHandler = async (req: AuthenticatedRequest, _, next) => {
  const token = getToken(req);
  if (token) {
    try {
      const decodedToken = verifyToken<DecodedAuthToken>(token);
      req.decodedToken = decodedToken;
      next();
    } catch (err) {
      console.error(err);
      next();
    }
  } else {
    next();
  }
};
