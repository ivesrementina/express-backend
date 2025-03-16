import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/IUser"; // adjust this path if needed

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export const generateToken = (user: IUser): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "24h" }
  );
};