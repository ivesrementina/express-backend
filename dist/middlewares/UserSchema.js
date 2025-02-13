"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.UserSchema = void 0;
const zod_1 = require("zod");
const Validator_1 = require("./Validator");
exports.UserSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required.",
        invalid_type_error: "Name must be a string.",
    }).min(2, "Name must be at least 2 characters long."),
    email: zod_1.z.string({
        required_error: "Email is required.",
        invalid_type_error: "Email must be a string.",
    }).email("Invalid email format."),
    password: zod_1.z.string({
        required_error: "Password is required.",
        invalid_type_error: "Password must be a string.",
    }).min(6, "Password must be at least 6 characters long."),
});
exports.validateUser = new Validator_1.Validator().execute(exports.UserSchema);
