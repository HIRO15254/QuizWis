import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export function hash(password: string): string {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

export function compare(password: string, hashed: string): boolean {
  return bcrypt.compareSync(password, hashed);
}
