import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;
if (!SECRET) throw new Error("JWT_SECRET missing in env");

export interface FF24UserPayload extends JwtPayload {
  id: string;
  email: string;
}

/**
 * Создание JWT токена
 */
export function signJwt(payload: FF24UserPayload, expiresIn = "7d"): string {
  return jwt.sign(payload, SECRET, { expiresIn });
}

/**
 * Проверка JWT + приведение к типу FF24UserPayload
 */
export function verifyJwt(token: string): FF24UserPayload {
  const decoded = jwt.verify(token, SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid JWT payload format");
  }

  if (!decoded.id || !decoded.email) {
    throw new Error("Invalid JWT payload");
  }

  return decoded as FF24UserPayload;
}
