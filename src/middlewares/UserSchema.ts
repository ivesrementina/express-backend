import { AnyZodObject, z } from "zod";
import { Validator } from "./Validator";

export const UserSchema: AnyZodObject = z.object({
  first_name: z.string()
    .min(2, "First name must be at least 2 characters long.")
    .max(50, "First name must not exceed 50 characters.")
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "First name must contain only letters and can include one space."),

  middle_name: z.string().optional(),

  last_name: z.string()
    .min(2, "Last name must be at least 2 characters long.")
    .max(50, "Last name must not exceed 50 characters.")
    .regex(/^[A-Za-z]+$/, "Last name must contain only letters without spaces."),

  name_ext: z.string().optional(),

  email: z.string().email("Invalid email format."),

  // ✅ Make password optional but provide default value
  password: z.string()
    .min(6, "Password must be at least 6 characters long.")
    .default("SZ12345") // ✅ Auto-generates default password if missing
    .optional(), // ✅ Password is not required in request
});

// ✅ Separate Validation for Partial Updates (PUT)
export const validateUserUpdate = new Validator().execute(UserSchema.partial()); // ✅ Allows partial fields

// ✅ Full Validation for User Creation (POST)
export const validateUser = new Validator().execute(UserSchema);






