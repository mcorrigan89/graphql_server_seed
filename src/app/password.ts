import bcrypt from 'bcrypt';

/**
 * Returns a hash from a string
 * @param password
 */
export const encrypt = (password: string) => {
  return bcrypt.hash(password, 1);
};

/**
 * Compares a string password with a hash
 * @param password
 * @param hashedPassword
 */
export const compare = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};
