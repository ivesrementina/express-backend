import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import { handleSuccess } from "../utils/responseHandler";
import { IUserRequest } from "../interfaces/IUserRequest";  // Import DTO
import { IUser } from "../interfaces/IUser";  // Import User interface

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users: IUser[] = await userService.getAllUsers();
    handleSuccess(res, users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userRequest: IUserRequest = req.body;  // Ensures request matches IUserRequest
    const user: IUser = await userService.createUser(userRequest);

    console.log("Successfully created user:", user);  // Debug log
    handleSuccess(res, user, 201);
  } catch (error) {
    console.error("Error creating user:", error);
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user: IUser | null = await userService.getUserById(parseInt(req.params.id));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    handleSuccess(res, user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updateData: Partial<IUserRequest> = req.body; // Allow updating partial fields
    const updatedUser: IUser | null = await userService.updateUser(parseInt(req.params.id), updateData);

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    handleSuccess(res, updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result: boolean = await userService.deleteUser(parseInt(req.params.id));
    if (!result) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    handleSuccess(res, { message: "User deleted" });
  } catch (error) {
    next(error);
  }
};


