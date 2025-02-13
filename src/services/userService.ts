import { IUser } from "../interfaces/IUser";
import { IUserRequest } from "../interfaces/IUserRequest";
import { MySQLUserRepository } from "../repository/implementation/UserRepository";

const userRepository = new MySQLUserRepository();

export const getAllUsers = async (): Promise<IUser[]> => {
  return await userRepository.findAll();
};

export const createUser = async (data: IUserRequest): Promise<IUser> => {
  return await userRepository.create(data);
};

export const getUserById = async (id: number): Promise<IUser | null> => {
  return await userRepository.findById(id);
};

export const updateUser = async (id: number, data: Partial<IUserRequest>): Promise<IUser | null> => {
  return await userRepository.update(id, data);
};

export const deleteUser = async (id: number): Promise<boolean> => {
  return await userRepository.delete(id);
};


