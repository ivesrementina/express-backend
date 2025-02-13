"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const zod_1 = require("zod");
class Validator {
    execute(schema) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield schema.parseAsync(req.body); // Validate request body
                next(); // Proceed if validation passes
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
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
        });
    }
}
exports.Validator = Validator;
