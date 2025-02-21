import { AnyZodObject, z } from "zod";
import { Validator } from "./Validator";

export const UserSchema: AnyZodObject = z.object({
  first_name: z.string({
    required_error: "First name is required.",
    invalid_type_error: "First name must be a string.",
  })
  .min(2, "First name must be at least 2 characters long.")
  .max(50, "First name must not exceed 50 characters.")
  .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "First name must contain only letters and can include one space."),  

  middle_name: z.string({
    invalid_type_error: "Middle name must be a string.",
  }).optional(),

  last_name: z.string({
    required_error: "Last name is required.",
    invalid_type_error: "Last name must be a string.",
  })
  .min(2, "Last name must be at least 2 characters long.")
  .max(50, "Last name must not exceed 50 characters.")
  .regex(/^[A-Za-z]+$/, "Last name must contain only letters without spaces."),  

  name_ext: z.string({
    invalid_type_error: "Name extension must be a string.",
  }).optional(),

  email: z.string({
    required_error: "Email is required.",
    invalid_type_error: "Email must be a string.",
  }).email("Invalid email format."),

  password: z.string({
    required_error: "Password is required.",
    invalid_type_error: "Password must be a string.",
  }).min(6, "Password must be at least 6 characters long."),
});

// ✅ Use Validator Middleware
export const validateUser = new Validator().execute(UserSchema);




