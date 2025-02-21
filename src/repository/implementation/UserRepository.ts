import { pool } from "../../config/database";
import { IUser } from "../../interfaces/IUser";
import { IUserRepository } from "../IUserRepository";

export class MySQLUserRepository implements IUserRepository {
  // 🟢 Create User (Ensures hashed password is stored)
  async create(data: IUser): Promise<IUser> {
    const query = `
      INSERT INTO users (first_name, middle_name, last_name, name_ext, email, password) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result]: any = await pool.query(query, [
      data.first_name,
      data.middle_name,
      data.last_name,
      data.name_ext ?? undefined, // ✅ Use `undefined` instead of `null`
      data.email,
      data.password, // Assumes password is already hashed before calling this function
    ]);

    // ✅ Construct return object explicitly (avoids duplicate `id` issue)
    return {
      id: result.insertId, // Assign the auto-incremented ID
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      name_ext: data.name_ext ?? undefined, // ✅ Avoid `null` by defaulting to `undefined`
      email: data.email,
      password: data.password, // Password remains hashed
      created_at: new Date(), // Assuming DB auto-handles timestamps
      updated_at: new Date(),
    };
  }

  // 🟡 Get All Users (Excludes password for security)
  async findAll(): Promise<IUser[]> {
    const [rows] = await pool.query(`
      SELECT id, first_name, middle_name, last_name, name_ext, email, created_at, updated_at 
      FROM users
    `);
    return rows as IUser[];
  }

  // 🟠 Get User by ID (Excludes password)
  async findById(id: number): Promise<IUser | null> {
    const [rows] = await pool.query(`
      SELECT id, first_name, middle_name, last_name, name_ext, email, created_at, updated_at 
      FROM users 
      WHERE id = ?
    `, [id]);

    const users = rows as IUser[];
    return users.length > 0 ? users[0] : null;
  }

  // 🔍 Get User by Email (Used for authentication)
  async findByEmail(email: string): Promise<IUser | null> {
    const [rows] = await pool.query(`
      SELECT * FROM users WHERE email = ?
    `, [email]);

    const users = rows as IUser[];
    return users.length > 0 ? users[0] : null;
  }

  // 🟠 Update User (Prevents overwriting password if not updated)
  async update(id: number, data: Partial<IUser>): Promise<IUser | null> {
    // Get current user to keep existing password if not provided
    const existingUser = await this.findById(id);
    if (!existingUser) return null;

    const query = `
      UPDATE users 
      SET first_name = ?, middle_name = ?, last_name = ?, name_ext = ?, email = ?, password = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await pool.query(query, [
      data.first_name || existingUser.first_name,
      data.middle_name !== undefined ? data.middle_name : existingUser.middle_name,
      data.last_name || existingUser.last_name,
      data.name_ext !== undefined ? data.name_ext ?? undefined : existingUser.name_ext, // ✅ Fix null issue
      data.email || existingUser.email,
      data.password ? data.password : existingUser.password, // Keep existing password if not updated
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


