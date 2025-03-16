import { pool } from "../../config/database";
import { IUser } from "../../interfaces/IUser";
import { IUserRepository } from "../IUserRepository";

export class MySQLUserRepository implements IUserRepository {
  // 🟢 Create User (Ensures hashed password is stored)
  async create(data: IUser): Promise<IUser> {
    const query = `
      INSERT INTO users (first_name, middle_name, last_name, name_ext, email, password, username) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result]: any = await pool.query(query, [
      data.first_name,
      data.middle_name,
      data.last_name,
      data.name_ext ?? undefined,
      data.email,
      data.password,
      data.username, // ✅ Save auto-generated username
    ]);
  
    return {
      id: result.insertId,
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      name_ext: data.name_ext ?? undefined,
      email: data.email,
      password: data.password,
      username: data.username, // ✅ Return auto-generated username
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
  

  // 🟡 Get All Users (Excludes password for security)
  async findAllPaginated(page: number = 1, limit: number = 10): Promise<{
    users: IUser[];
    totalRecords: number;
  }> {
    const offset = (page - 1) * limit;
  
    // Fetch paginated users
    const [rows] = await pool.query(
      `
      SELECT id, first_name, middle_name, last_name, name_ext, email, created_at, updated_at 
      FROM users
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );
  
    // Fetch total record count
    const [countResult] = await pool.query(`SELECT COUNT(*) as total FROM users`);
    const totalRecords = (countResult as any)[0]?.total || 0;
  
    return {
      users: rows as IUser[],
      totalRecords,
    };
  }
  

  // 🟠 Get User by ID (Excludes password)
  async findById(id: number): Promise<IUser | null> {
    const [rows] = await pool.query(`
      SELECT id, first_name, middle_name, last_name, name_ext, email, password, created_at, updated_at 
      FROM users 
      WHERE id = ?
    `, [id]);
  
    const users = rows as IUser[];
    return users.length > 0 ? users[0] : null;
  }
  

  // 🔍 Check if username already exists
async findByUsername(username: string): Promise<IUser | null> {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );
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

  async update(id: number, data: Partial<IUser>): Promise<IUser | null> {
    // Fetch existing user details
    const existingUser = await this.findById(id);
    if (!existingUser) return null;
  
    const query = `
      UPDATE users 
      SET first_name = ?, middle_name = ?, last_name = ?, name_ext = ?, email = ?, 
          password = ?, updated_at = NOW()
      WHERE id = ?
    `;
  
    await pool.query(query, [
      data.first_name || existingUser.first_name,
      data.middle_name !== undefined ? data.middle_name : existingUser.middle_name,
      data.last_name || existingUser.last_name,
      data.name_ext !== undefined ? data.name_ext : existingUser.name_ext,
      data.email || existingUser.email,
      data.password ? data.password : existingUser.password, // Keep existing password if not updating
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


