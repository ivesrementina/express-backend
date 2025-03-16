import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/IUser";
import { IUserRequest } from "../interfaces/IUserRequest";
import { MySQLUserRepository } from "../repository/implementation/UserRepository";

const userRepository = new MySQLUserRepository();

/**
 * ✅ Fetch all users
 */
export const getAllUsers = async (page: number, limit: number) => {
  return await userRepository.findAllPaginated(page, limit);
};

/**
 * ✅ Generate a unique username based on first and last name
 * Example: "Ives Matthew" + "Rementina" → IMRementina
 */
const generateUsername = async (firstName: string, lastName: string): Promise<string> => {
  // Sanitize inputs
  const sanitizedFirstName = firstName.trim();
  const sanitizedLastName = lastName.trim().replace(/\s+/g, "");

  // Get initials from first two words of the first name
  const firstNameParts = sanitizedFirstName.split(/\s+/);
  const initials = firstNameParts
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join("");

  // Initial username format: initials + lastName
  const baseUsername = `${initials}${sanitizedLastName}`;
  let finalUsername = baseUsername;

  // Check for uniqueness by appending a counter if needed
  let counter = 1;
  while (await userRepository.findByUsername(finalUsername)) {
    finalUsername = `${baseUsername}${counter}`;
    counter++;
  }

  return finalUsername;
};


/**
 * ✅ Default generated password (Fixed: "SZ12345")
 */
const generateDefaultPassword = (): string => {
  return process.env.DEFAULT_PASSWORD || "SZ12345"; // Fallback if env is missing
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

/**
 * ✅ Update User Password (Validates Current Password)
 */
export const updateUserPassword = async (id: number, currentPassword: string, newPassword: string): Promise<boolean> => {
  // 🟢 Fetch the current user
  const user = await userRepository.findById(id);

  // 🛑 Handle case where user is not found
  if (!user) {
    console.error("❌ Error: User not found.");
    return false;
  }

  console.log("🔍 Retrieved user from DB:", user);

  // 🛑 Handle case where password is missing
  if (!user.password) {
    console.error("❌ Error: Password field is missing for this user.");
    return false;
  }

  console.log("🔍 Stored password hash:", user.password);

  // 🔍 Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    console.error("❌ Error: Current password is incorrect.");
    return false;
  }

  // 🔐 Hash new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // 📝 Update password in DB
  await userRepository.update(id, { password: hashedNewPassword });

  console.log("✅ Password updated successfully.");
  return true;
};












