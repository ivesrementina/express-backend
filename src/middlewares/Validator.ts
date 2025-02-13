import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export class Validator {
  execute(schema: AnyZodObject) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        await schema.parseAsync(req.body); // Validate request body
        next(); // Proceed if validation passes
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: error.errors,
          });
          return; // Ensure function exits after sending response
        }

        console.error("Unexpected Error in Validator Middleware:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    };
  }
}
