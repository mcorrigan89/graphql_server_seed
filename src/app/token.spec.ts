import { createToken, verifyToken } from './token';

describe('@app/token', () => {
  it('should generate a token string from an object', () => {
    const data = { flerp: 'derp ' };
    const token = createToken(data);
    expect(token).not.toBe(data);
  });

  it('should generate a token that can be verified and decoded to the same object', () => {
    const data = { flerp: 'derp' };
    const token = createToken(data);
    expect(token).not.toBe(data);
    const decoded = verifyToken(token);
    delete decoded['iat'];
    expect(decoded).toEqual(data);
  });
});
