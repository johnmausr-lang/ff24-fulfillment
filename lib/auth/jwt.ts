// lib/auth/jwt.ts

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret_key_change_me";

export function signJwt(payload: any, expiresIn: string = "7d") {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
