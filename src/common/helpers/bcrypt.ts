import * as bcrypt from 'bcrypt';

export async function encrypt(str: string): Promise<string> {
  const salt = await bcrypt.genSalt(+process.env.CRYPT_SALT);
  return await bcrypt.hash(str, salt);
}

export async function compare(str: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(str, hash);
}
