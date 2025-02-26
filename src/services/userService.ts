import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/IUser";
import { IUserRequest } from "../interfaces/IUserRequest";
import { MySQLUserRepository } from "../repository/implementation/UserRepository";

const userRepository = new MySQLUserRepository();

/**
 * Fetches all users from the database.
 */
export const getAllUsers = async (): Promise<IUser[]> => {
  return await userRepository.findAll();
};

/**
 * Generates a unique username based on the first letter of the first two words in the first name
 * and the full last name.
 */
export const generateUsername = async (firstName: string, lastName: string): Promise<string> => {
  const nameParts = firstName.trim().split(/\s+/); // Splits first name into words

  // ✅ Extract initials from the first two words
  const initials = nameParts.slice(0, 2).map(word => word.charAt(0)).join("").toUpperCase();

  let username = `${initials}${lastName.replace(/\s+/g, "")}`; // Remove spaces from last name

  // ✅ Ensure username uniqueness
  let uniqueUsername = username;
  let counter = 1;
  while (await userRepository.findByUsername(uniqueUsername)) {
    uniqueUsername = `${username}${counter}`; // Append a number if username exists
    counter++;
  }

  return uniqueUsername;
};

/**
 * Creates a new user with an auto-generated username and default password if missing.
 */
export const createUser = async (data: IUserRequest): Promise<IUser> => {
  // ✅ Ensure the password exists, use default if missing
  const password = data.password && data.password.length >= 6 ? data.password : "IR12345";
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ Generate username dynamically
  const username = await generateUsername(data.first_name, data.last_name);

  const userData: IUser = {
    id: 0, // Placeholder, DB auto-generates this
    first_name: data.first_name,
    middle_name: data.middle_name || "", // Ensure middle name is optional
    last_name: data.last_name,
    name_ext: data.name_ext || "",
    email: data.email,
    password: hashedPassword,
    username, // ✅ Assign generated username
    created_at: new Date(),
    updated_at: new Date(),
  };

  return await userRepository.create(userData);
};

/**
 * Fetches a user by ID.
 */
export const getUserById = async (id: number): Promise<IUser | null> => {
  return await userRepository.findById(id);
};

/**
 * Updates a user, ensuring the password is hashed if provided.
 */
export const updateUser = async (id: number, data: Partial<IUserRequest>): Promise<IUser | null> => {
  if (data.password && typeof data.password === "string") {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return await userRepository.update(id, data);
};

/**
 * Deletes a user by ID.
 */
export const deleteUser = async (id: number): Promise<boolean> => {
  return await userRepository.delete(id);
};







