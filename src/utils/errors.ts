import { ApolloError } from 'apollo-server';

// HTTP 400 - Bad Request
export class BadRequestError extends ApolloError {
  constructor(message?: string, code?: string) {
    super(message ? message : 'Bad Request', code ? code : 'BAD_REQUEST', { statusCode: 400 });
  }
}

// HTTP - 401 Unauthorized
export class AuthorizationError extends ApolloError {
  constructor(message?: string) {
    super(message ? message : 'Not Authorized', 'NOT_AUTHORIZED', { statusCode: 401 });
  }
}

// HTTP - 403 Forbidden
export class AuthenticationError extends ApolloError {
  constructor(message?: string) {
    super(message ? message : 'Not Authenticated', 'NOT_AUTHENTICATED', { statusCode: 403 });
  }
}

// HTTP - 404 Not Found
export class NotFoundError extends ApolloError {
  constructor(message?: string) {
    super(message ? message : 'Not Found', 'NOT_FOUND', { statusCode: 404 });
  }
}

// HTTP - *** Whatever
export class GenericError extends ApolloError {
  constructor(statusCode: number, message: string, code?: string, props?: Record<string, unknown>) {
    super(message, code, { ...props, statusCode });
  }
}
