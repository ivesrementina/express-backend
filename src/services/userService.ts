import { v4 as uuidv4 } from "uuid";
import { User, users } from "../config/database";

export const getAllUsers = (): User[] => {
  return users;
};

export const createUser = (name: string, email: string): User => {
  const newUser: User = { id: uuidv4(), name, email };
  users.push(newUser);
  return newUser;
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const updateUser = (id: string, name: string, email: string): User | undefined => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return undefined;

  users[userIndex] = { id, name, email };
  return users[userIndex];
};

export const deleteUser = (id: string): boolean => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return false;

  users.splice(userIndex, 1);
  return true;
};