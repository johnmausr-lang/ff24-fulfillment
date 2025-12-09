// lib/auth/jwt.ts

import jwt, { SignOptions } from "jsonwebtoken";

const SECRET: string = process.env.JWT_SECRET || "default_secret_change_me";

export function signJwt(payload: any, expiresIn: string = "7d") {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET as jwt.Secret, options);
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET as jwt.Secret);
  } catch {
    return null;
  }
}
