// lib/encryption.ts
import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
// ⚠️ Ключ шифрования должен быть СТРОГО 32 байта (64 hex символа) и храниться в .env
const ENCRYPTION_KEY_HEX = process.env.ENCRYPTION_KEY || '0000000000000000000000000000000000000000000000000000000000000000'; // Используйте реальный ключ!
const ENCRYPTION_KEY = Buffer.from(ENCRYPTION_KEY_HEX, 'hex');
const IV_LENGTH = 16; 

/**
 * Шифрует текстовые данные (ключи API)
 * @param text Открытый текст для шифрования
 * @returns Строка в формате: InitializationVector:EncryptedData
 */
export function encrypt(text: string): string {
  if (ENCRYPTION_KEY.length !== 32) throw new Error("ENCRYPTION_KEY must be 32 bytes (64 hex chars)");
  
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * Дешифрует данные, полученные из БД
 * @param text Зашифрованная строка в формате IV:Data
 * @returns Расшифрованный открытый текст (ключ API)
 */
export function decrypt(text: string): string {
  if (ENCRYPTION_KEY.length !== 32) throw new Error("ENCRYPTION_KEY must be 32 bytes (64 hex chars)");
  
  const textParts = text.split(':');
  if (textParts.length !== 2) throw new Error("Invalid encrypted format");

  const iv = Buffer.from(textParts[0], 'hex');
  const encryptedText = Buffer.from(textParts[1], 'hex');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted.toString('utf8');
}
