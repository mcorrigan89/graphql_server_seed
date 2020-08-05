import { encrypt, compare } from './password';

describe('@app/password', () => {
  it('encrypt the password', () => {
    const password = 'password';
    const encrypted = encrypt(password);
    expect(password).not.toBe(encrypted);
  });

  it('should return true for an encrypted password match', async () => {
    const password = 'password';
    const encrypted = await encrypt(password);
    const decryptResult = await compare(password, encrypted);
    expect(decryptResult).toBe(true);
  });

  it('should return false for an encrypted password mismatch', async () => {
    const password = 'password';
    const wrongPassword = 'flerpderp';
    const encrypted = await encrypt(password);
    const decryptResult = await compare(wrongPassword, encrypted);
    expect(decryptResult).toBe(false);
  });
});
