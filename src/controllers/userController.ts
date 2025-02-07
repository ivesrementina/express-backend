import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import { handleSuccess, handleError } from "../utils/responseHandler";

// Correct typing for async controllers
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = userService.getAllUsers();
    handleSuccess(res, users);
  } catch (error) {
    next(error); // Ensure correct error handling
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email } = req.body;
    const user = userService.createUser(name, email);
    handleSuccess(res, user, 201);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = userService.getUserById(req.params.id);
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
    const { name, email } = req.body;
    const updatedUser = userService.updateUser(req.params.id, name, email);
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
    const result = userService.deleteUser(req.params.id);
    if (!result) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    handleSuccess(res, { message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
