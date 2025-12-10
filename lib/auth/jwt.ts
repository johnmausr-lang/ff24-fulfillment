import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function verifyJwt(token: string): JwtPayload {
  const payload = jwt.verify(token, SECRET);

  if (typeof payload === "string") {
    throw new Error("Invalid JWT payload");
  }

  return payload;
}
