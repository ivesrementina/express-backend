import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import { handleSuccess } from "../utils/responseHandler";
import { IUserRequest } from "../interfaces/IUserRequest";  // DTO for user requests
import { IUser } from "../interfaces/IUser";              // User interface

//Get All Users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users: IUser[] = await userService.getAllUsers();
    handleSuccess(res, users, 200);
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

//Update User
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID format" });
      return;
    }

    const updateData: Partial<IUserRequest> = req.body;
    const updatedUser: IUser | null = await userService.updateUser(userId, updateData);

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



