import bcrypt from "bcrypt";

const SALT_ROUNDS = 11;

/**
 * Hash a plain text password
 * @param plainPassword - The plain text password to hash
 * @returns Promise<string> - The hashed password
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

/**
 * Compare a plain text password with a hashed password
 * @param plainPassword - The plain text password to verify
 * @param hashedPassword - The hashed password to compare against
 * @returns Promise<boolean> - True if passwords match, false otherwise
 */
export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
