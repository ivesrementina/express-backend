export interface IUser {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  name_ext?: string;
  email: string;
  password: string;
  username: string; // ✅ Added auto-generated username
  created_at: Date;
  updated_at: Date;
}

