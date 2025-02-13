import { IUser } from "../interfaces/IUser";

export interface IUserRepository {
  create(data: IUser): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  findById(id: number): Promise<IUser | null>;
  update(id: number, data: Partial<IUser>): Promise<IUser | null>;
  delete(id: number): Promise<boolean>;
}