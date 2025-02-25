import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/IUser";
import { IUserRequest } from "../interfaces/IUserRequest";
import { MySQLUserRepository } from "../repository/implementation/UserRepository";

const userRepository = new MySQLUserRepository();

export const getAllUsers = async (): Promise<IUser[]> => {
  return await userRepository.findAll();
};

export const createUser = async (data: IUserRequest): Promise<IUser> => {
  // ✅ Ensure the password is set (Zod already defaults it)
  const password = data.password ?? "IR12345"; // If password is missing, default to "IR12345"

  // ✅ Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ Construct `IUser` object before saving
  const userData: IUser = {
    id: 0, // Placeholder, DB auto-generates ID
    first_name: data.first_name,
    middle_name: data.middle_name || "",
    last_name: data.last_name,
    name_ext: data.name_ext || "",
    email: data.email,
    password: hashedPassword, // Store hashed password
    created_at: new Date(),
    updated_at: new Date(),
  };

  return await userRepository.create(userData);
};

export const getUserById = async (id: number): Promise<IUser | null> => {
  return await userRepository.findById(id);
};

export const updateUser = async (id: number, data: Partial<IUserRequest>): Promise<IUser | null> => {
  // ✅ Check if password is provided before hashing
  if (data.password && typeof data.password === "string") {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return await userRepository.update(id, data);
};

export const deleteUser = async (id: number): Promise<boolean> => {
  return await userRepository.delete(id);
};





