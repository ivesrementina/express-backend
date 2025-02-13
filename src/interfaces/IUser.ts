export interface IUser {
    id?: number;  // Auto-incremented in DB
    name: string;
    email: string;
    password?: string;  // Optional for authentication
    created_at?: Date;  // Optional, automatically set in DB
  }