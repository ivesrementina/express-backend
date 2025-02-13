import { pool } from "../../config/database";
import { IUser } from "../../interfaces/IUser";
import { IUserRepository } from "../IUserRepository";

export class MySQLUserRepository implements IUserRepository {
  async create(data: IUser): Promise<IUser> {
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const [result]: any = await pool.query(query, [data.name, data.email, data.password]);

    return { id: result.insertId, ...data };
  }

  async findAll(): Promise<IUser[]> {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows as IUser[];
  }

  async findById(id: number): Promise<IUser | null> {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    const users = rows as IUser[];
    return users.length > 0 ? users[0] : null;
  }

  async update(id: number, data: Partial<IUser>): Promise<IUser | null> {
    await pool.query("UPDATE users SET ? WHERE id = ?", [data, id]);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const [result]: any = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}
