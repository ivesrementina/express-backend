import { IUser } from "../interfaces/IUser";
import { IUserRequest } from "../interfaces/IUserRequest";
import { MySQLUserRepository } from "../repository/implementation/UserRepository";

const userRepository = new MySQLUserRepository();

export const getAllUsers = async (): Promise<IUser[]> => {
  return await userRepository.findAll();
};

export const createUser = async (data: IUserRequest): Promise<IUser> => {
  const userData: IUserRequest = {
    first_name: data.first_name,
    middle_name: data.middle_name,
    last_name: data.last_name,
    name_ext: data.name_ext,
    email: data.email,
    password: data.password,
  };
  return await userRepository.create(userData);
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



