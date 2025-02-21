export interface IUser {
  id: number;                // Auto-incremented ID (Required)
  first_name: string;        // Required first name
  middle_name: string;       // Required middle name (Not optional)
  last_name: string;         // Required last name
  name_ext?: string;         // Optional name extension
  email: string;             // User email
  password: string;          // Required hashed password (Not optional)
  created_at: Date;          // Required created timestamp
  updated_at: Date;          // Required updated timestamp
}

