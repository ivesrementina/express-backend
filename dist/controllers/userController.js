"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
const userService = __importStar(require("../services/userService"));
const responseHandler_1 = require("../utils/responseHandler");
// 🟢 Get All Users
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getAllUsers();
        (0, responseHandler_1.handleSuccess)(res, users, 200);
    }
    catch (error) {
        console.error("❌ Error in getAllUsers:", error);
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
// 🟢 Create New User
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRequest = req.body; // Validate incoming request
        const user = yield userService.createUser(userRequest);
        console.log("✅ User created successfully:", user);
        (0, responseHandler_1.handleSuccess)(res, user, 201); // 201 Created
    }
    catch (error) {
        console.error("❌ Error creating user:", error);
        next(error);
    }
});
exports.createUser = createUser;
// 🟢 Get User By ID
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID format" });
            return;
        }
        const user = yield userService.getUserById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        (0, responseHandler_1.handleSuccess)(res, user, 200);
    }
    catch (error) {
        console.error("❌ Error in getUserById:", error);
        next(error);
    }
});
exports.getUserById = getUserById;
// 🟡 Update User
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID format" });
            return;
        }
        const updateData = req.body;
        const updatedUser = yield userService.updateUser(userId, updateData);
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        (0, responseHandler_1.handleSuccess)(res, updatedUser, 200);
    }
    catch (error) {
        console.error("❌ Error in updateUser:", error);
        next(error);
    }
});
exports.updateUser = updateUser;
// 🛑 Delete User
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID format" });
            return;
        }
        const result = yield userService.deleteUser(userId);
        if (!result) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        (0, responseHandler_1.handleSuccess)(res, { message: "User deleted successfully" }, 200);
    }
    catch (error) {
        console.error("❌ Error in deleteUser:", error);
        next(error);
    }
});
exports.deleteUser = deleteUser;
