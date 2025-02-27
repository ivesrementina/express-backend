import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/IUser";
import { IUserRequest } from "../interfaces/IUserRequest";
import { MySQLUserRepository } from "../repository/implementation/UserRepository";

const userRepository = new MySQLUserRepository();

/**
 * ✅ Fetch all users
 */
export const getAllUsers = async (): Promise<IUser[]> => {
  return await userRepository.findAll();
};

/**
 * ✅ Generate a unique username based on first and last name
 * Example: "Ives Matthew" + "Rementina" → IMRementina
 */
const generateUsername = async (firstName: string, lastName: string): Promise<string> => {
  const nameParts = firstName.trim().split(/\s+/); // Split first name by spaces
  const initials = nameParts.slice(0, 2).map(word => word.charAt(0)).join("").toUpperCase(); // Get initials from first two words

  let username = `${initials}${lastName.replace(/\s+/g, "")}`; // Remove spaces from last name

  // ✅ Ensure username is unique
  let uniqueUsername = username;
  let counter = 1;
  while (await userRepository.findByUsername(uniqueUsername)) {
    uniqueUsername = `${username}${counter}`; // Append number if username exists
    counter++;
  }

  return uniqueUsername;
};

/**
 * ✅ Default generated password (Fixed: "SZ12345")
 */
const generateDefaultPassword = (): string => {
  return "SZ12345";
};

/**
 * ✅ Create a new user with auto-generated username & default password if missing
 */
export const createUser = async (data: IUserRequest): Promise<IUser> => {
  // ✅ Use "SZ12345" as the default password if not provided
  const password = data.password && data.password.length >= 6 ? data.password : generateDefaultPassword();
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ Generate username dynamically
  const username = await generateUsername(data.first_name, data.last_name);

  const userData: IUser = {
    id: 0, // Placeholder, DB auto-generates this
    first_name: data.first_name,
    middle_name: data.middle_name || "",
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
 * ✅ Retrieve a user by ID
 */
export const getUserById = async (id: number): Promise<IUser | null> => {
  return await userRepository.findById(id);
};

/**
 * ✅ Update user details (Hash new password if provided)
 */
export const updateUser = async (id: number, data: Partial<IUserRequest>): Promise<IUser | null> => {
  if (data.password && typeof data.password === "string") {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return await userRepository.update(id, data);
};

/**
 * ✅ Delete a user by ID
 */
export const deleteUser = async (id: number): Promise<boolean> => {
  return await userRepository.delete(id);
};

/**
 * ✅ Authenticate user login
 */
export const authenticateUser = async (email: string, password: string): Promise<IUser | null> => {
  const user = await userRepository.findByEmail(email);
  if (!user) return null;

  // ✅ Compare hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid ? user : null;
};










