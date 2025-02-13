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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Check MySQL connection before starting the server
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield database_1.pool.query("SELECT DATABASE() as db");
        console.log("✅ Connected to Database:", result);
    }
    catch (error) {
        console.error("❌ Failed to connect to MySQL:", error);
        process.exit(1); // Stop the server if DB connection fails
    }
}))();
app.use("/api/users", userRoutes_1.default);
// Error-handling middleware
app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
