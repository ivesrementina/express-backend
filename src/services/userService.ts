import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/IUser";
import { IUserRequest } from "../interfaces/IUserRequest";
import { MySQLUserRepository } from "../repository/implementation/UserRepository";

const userRepository = new MySQLUserRepository();

export const getAllUsers = async (): Promise<IUser[]> => {
  return await userRepository.findAll();
};

export const createUser = async (data: IUserRequest): Promise<IUser> => {
  // ✅ Ensure password exists before hashing
  if (!data.password) {
    throw new Error("Password is required.");
  }

  // ✅ Hash password before saving it
  const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the salt rounds

  // ✅ Construct `IUser` object before saving (to include `id`, `created_at`, `updated_at`)
  const userData: IUser = {
    id: 0, // Placeholder, DB will auto-generate
    first_name: data.first_name,
    middle_name: data.middle_name || "", // Provide default values for optional fields
    last_name: data.last_name,
    name_ext: data.name_ext || "",
    email: data.email,
    password: hashedPassword, // Store hashed password
    created_at: new Date(), // Assign current timestamp
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





