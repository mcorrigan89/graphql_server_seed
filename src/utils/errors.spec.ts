import { BadRequestError, AuthorizationError, AuthenticationError, NotFoundError, GenericError } from './errors';

describe('@utils/errors', () => {
  describe('BadRequestError', () => {
    it('should have status code BAD_REQUEST', () => {
      const error = new BadRequestError('This is my error');
      expect(error.extensions.code).toBe('BAD_REQUEST');
    });

    it('should have status statusCode 400', () => {
      const error = new BadRequestError('This is my error');
      expect(error.extensions.statusCode).toBe(400);
    });

    it('should throw with error message', () => {
      const throwError = () => {
        throw new BadRequestError('This is my error');
      };
      expect(throwError).toThrow('This is my error');
    });
  });

  describe('AuthorizationError', () => {
    it('should have status code NOT_AUTHORIZED', () => {
      const error = new AuthorizationError('This is my error');
      expect(error.extensions.code).toBe('NOT_AUTHORIZED');
    });

    it('should have status statusCode 401', () => {
      const error = new AuthorizationError('This is my error');
      expect(error.extensions.statusCode).toBe(401);
    });

    it('should throw with error message', () => {
      const throwError = () => {
        throw new AuthorizationError('This is my error');
      };
      expect(throwError).toThrow('This is my error');
    });
  });

  describe('AuthenticationError', () => {
    it('should have status code NOT_AUTHORIZED', () => {
      const error = new AuthenticationError('This is my error');
      expect(error.extensions.code).toBe('NOT_AUTHENTICATED');
    });

    it('should have status statusCode 403', () => {
      const error = new AuthenticationError('This is my error');
      expect(error.extensions.statusCode).toBe(403);
    });

    it('should throw with error message', () => {
      const throwError = () => {
        throw new AuthenticationError('This is my error');
      };
      expect(throwError).toThrow('This is my error');
    });
  });

  describe('NotFoundError', () => {
    it('should have status code NOT_FOUND', () => {
      const error = new NotFoundError('This is my error');
      expect(error.extensions.code).toBe('NOT_FOUND');
    });

    it('should have status statusCode 404', () => {
      const error = new NotFoundError('This is my error');
      expect(error.extensions.statusCode).toBe(404);
    });

    it('should throw with error message', () => {
      const throwError = () => {
        throw new NotFoundError('This is my error');
      };
      expect(throwError).toThrow('This is my error');
    });
  });

  describe('GenericError', () => {
    it('should have status code set in error', () => {
      const error = new GenericError(418, 'Im a tea pot', 'IM_A_TEA_POT');
      expect(error.extensions.code).toBe('IM_A_TEA_POT');
    });

    it('should have status statusCode set in error', () => {
      const error = new GenericError(418, 'Im a tea pot');
      expect(error.extensions.statusCode).toBe(418);
    });

    it('should throw with error message', () => {
      const throwError = () => {
        throw new GenericError(418, 'Im a tea pot');
      };
      expect(throwError).toThrow('Im a tea pot');
    });
  });
});
