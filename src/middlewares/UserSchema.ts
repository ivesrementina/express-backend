import { AnyZodObject, z } from "zod";
import { Validator } from "./Validator";

export const UserSchema: AnyZodObject = z.object({
  name: z.string({
    required_error: "Name is required.",
    invalid_type_error: "Name must be a string.",
  }).min(2, "Name must be at least 2 characters long."),

  email: z.string({
    required_error: "Email is required.",
    invalid_type_error: "Email must be a string.",
  }).email("Invalid email format."),

  password: z.string({
    required_error: "Password is required.",
    invalid_type_error: "Password must be a string.",
  }).min(6, "Password must be at least 6 characters long."),
});

export const validateUser = new Validator().execute(UserSchema);
