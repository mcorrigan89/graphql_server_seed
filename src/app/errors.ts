import { ApolloError } from 'apollo-server';

// HTTP 400 - Bad Request
export class BadRequestError extends ApolloError {
  constructor(message: string, code?: string, props?: Record<string, any>) {
    super(message, code ? code : 'BAD_REQUEST', { ...props, statusCode: 400 })
  }
}

// HTTP - 401 Unauthorized
export class AuthorizationError extends ApolloError {
  constructor(message?: string, props?: Record<string, any>) {
    super(message ? message : 'Not Authorized', 'NOT_AUTHORIZED', { ...props, statusCode: 401 });
  }
}

// HTTP - 403 Forbidden
export class AuthenticationError extends ApolloError {
  constructor(message?: string, props?: Record<string, any>) {
    super(message ? message : 'Not Authenticated', 'NOT_AUTHENTICATED', { ...props, statusCode: 403 });
  }
}

// HTTP - 404 Not Found
export class NotFoundError extends ApolloError {
  constructor(message?: string, props?: Record<string, any>) {
    super(message ?  message : 'Not Found', 'NOT_FOUND', { ...props, statusCode: 404 });
  }
}

// HTTP - *** Whatever
export class GenericError extends ApolloError {
  constructor(statusCode: number, message: string, code?: string, props?: Record<string, any>) {
    super(message, code, { ...props, statusCode });
  }
}