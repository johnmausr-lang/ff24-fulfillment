import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;
if (!SECRET) throw new Error("JWT_SECRET missing in env");

export interface FF24UserPayload extends JwtPayload {
  id: string;
  email: string;
}

/**
 * Создание JWT токена
 */
export function signJwt(
  payload: FF24UserPayload,
  expiresIn: string | number = "7d"
): string {
  const options: SignOptions = {
    expiresIn: expiresIn as any, // TS FIX
  };

  return jwt.sign(
    payload,
    SECRET as jwt.Secret, // TS FIX
    options
  );
}

/**
 * Проверка JWT
 */
export function verifyJwt(token: string): FF24UserPayload {
  const decoded = jwt.verify(token, SECRET as jwt.Secret);

  if (typeof decoded === "string") {
    throw new Error("Invalid JWT payload format");
  }

  if (!decoded.id || !decoded.email) {
    throw new Error("Invalid JWT payload structure");
  }

  return decoded as FF24UserPayload;
}
