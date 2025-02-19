import { pool } from "../../config/database";
import { IUser } from "../../interfaces/IUser";
import { IUserRepository } from "../IUserRepository";

export class MySQLUserRepository implements IUserRepository {
  // 🟢 Create User
  async create(data: IUser): Promise<IUser> {
    const query = `
      INSERT INTO users (first_name, middle_name, last_name, name_ext, email, password) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result]: any = await pool.query(query, [
      data.first_name,
      data.middle_name,
      data.last_name,
      data.name_ext,
      data.email,
      data.password
    ]);

    return { id: result.insertId, ...data };
  }

  // 🟡 Get All Users
  async findAll(): Promise<IUser[]> {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows as IUser[];
  }

  // 🟠 Get User by ID
  async findById(id: number): Promise<IUser | null> {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    const users = rows as IUser[];
    return users.length > 0 ? users[0] : null;
  }

  // 🟠 Update User
  async update(id: number, data: Partial<IUser>): Promise<IUser | null> {
    const query = `
      UPDATE users 
      SET first_name = ?, middle_name = ?, last_name = ?, name_ext = ?, email = ?, password = ?
      WHERE id = ?
    `;
    await pool.query(query, [
      data.first_name,
      data.middle_name,
      data.last_name,
      data.name_ext,
      data.email,
      data.password,
      id
    ]);

    return this.findById(id);
  }

  // 🔴 Delete User
  async delete(id: number): Promise<boolean> {
    const [result]: any = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

