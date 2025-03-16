import { IUser } from "../interfaces/IUser";

export interface IUserRepository {
  create(data: IUser): Promise<IUser>;
  findAllPaginated(page: number, limit: number): Promise<{
    users: IUser[];
    totalRecords: number;
  }>;
  findById(id: number): Promise<IUser | null>;
  update(id: number, data: Partial<IUser>): Promise<IUser | null>;
  delete(id: number): Promise<boolean>;
}