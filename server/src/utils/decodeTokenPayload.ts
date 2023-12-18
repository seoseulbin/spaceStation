import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export default function decodeTokenPayload(userToken: string) {
  const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
  const jwtDecoded = jwt.verify(userToken, secretKey) as JwtPayload;

  return jwtDecoded;
}
