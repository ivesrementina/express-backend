export interface IUser {
  id?: number;               // Auto-incremented ID
  first_name: string;        // Required first name
  middle_name?: string;      // Optional middle name
  last_name: string;         // Required last name
  name_ext?: string;         // Optional name extension
  email: string;             // User email
  password?: string;         // Hashed password
  created_at?: Date;         // Created timestamp
  updated_at?: Date;         // Updated timestamp
}
