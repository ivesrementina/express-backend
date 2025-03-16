import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import { handleSuccess } from "../utils/responseHandler";
import { IUserRequest } from "../interfaces/IUserRequest";  // DTO for user requests
import { IUser } from "../interfaces/IUser";              // User interface
import { sanitizeUser } from "../utils/responseHandler";
import { generateToken } from "../utils/jwtUtils";

//Get All Users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, parseInt(req.query.limit as string) || 10);

    const { users, totalRecords } = await userService.getAllUsers(page, limit);

    const sanitizedUsers = users.map(sanitizeUser);

    handleSuccess(res, {
      users: sanitizedUsers,
      pagination: {
        currentPage: page,
        limit: limit,
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords,
      }
    }, 200);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    next(error);
  }
};


// 🟢 Create New User (With Auto-Generated Password)
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userRequest: IUserRequest = req.body;  

    // ✅ Pass request to userService to handle username and password logic
    const user: IUser = await userService.createUser(userRequest);

    console.log("✅ User created successfully:", user);
    handleSuccess(res, user, 201);
  } catch (error) {
    console.error("❌ Error creating user:", error);
    next(error);
  }
};

//Get User By ID
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID format" });
      return;
    }

    const user: IUser | null = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    handleSuccess(res, user, 200);
  } catch (error) {
    console.error("Error in getUserById:", error);
    next(error);
  }
};

// ✅ Update User Profile (Requires Current Password for Password Change)
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID format" });
      return;
    }

    const { currentPassword, newPassword, ...updateData } = req.body;

    // 🛑 If new password is provided, require the current password
    if (newPassword) {
      if (!currentPassword) {
        res.status(400).json({ message: "Current password is required to change your password." });
        return;
      }

      const isUpdated = await userService.updateUserPassword(userId, currentPassword, newPassword);
      if (!isUpdated) {
        res.status(401).json({ message: "Current password is incorrect." });
        return;
      }

      res.status(200).json({ message: "Password updated successfully." });
      return;
    }

    // ✅ Update other user details
    const updatedUser = await userService.updateUser(userId, updateData);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    handleSuccess(res, updatedUser, 200);
  } catch (error) {
    console.error("Error in updateUser:", error);
    next(error);
  }
};

//Delete User
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID format" });
      return;
    }

    const result: boolean = await userService.deleteUser(userId);
    if (!result) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    handleSuccess(res, { message: "User deleted successfully" }, 200);
  } catch (error) {
    console.error("Error in deleteUser:", error);
    next(error);
  }
};

// ✅ Login User
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    const user = await userService.authenticateUser(email, password);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    const token = generateToken(user);
    const sanitizedUser = sanitizeUser(user);

    handleSuccess(res, { message: "Login successful!", user: sanitizedUser, token }, 200);
  } catch (error) {
    console.error("Error in loginUser:", error);
    next(error);
  }
};



