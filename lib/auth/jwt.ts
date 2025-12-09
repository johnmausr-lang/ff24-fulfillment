// lib/auth/jwt.ts

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default_secret_key";

export function signJwt(payload: any, expiresIn: string = "7d") {
  return jwt.sign(payload, SECRET as jwt.Secret, {
    expiresIn: expiresIn as any,
  });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET as jwt.Secret);
  } catch {
    return null;
  }
}
