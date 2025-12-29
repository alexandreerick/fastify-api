import { hash, compare } from 'bcryptjs';

class Cryptography {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    const hashedPassword = await hash(value, this.salt);

    return hashedPassword;
  }

  async verify(value: string, hash: string): Promise<boolean> {
    const result = await compare(value, hash);

    return result;
  }
}

export { Cryptography };
