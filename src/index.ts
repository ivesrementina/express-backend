import express from "express";
import userRoutes from "./routes/userRoutes";
import { pool } from "./config/database";

const app = express();
app.use(express.json());

// Check MySQL connection before starting the server
(async () => {
  try {
    const [result] = await pool.query("SELECT DATABASE() as db");
    console.log("✅ Connected to Database:", result);
  } catch (error) {
    console.error("❌ Failed to connect to MySQL:", error);
    process.exit(1); // Stop the server if DB connection fails
  }
})();

app.use("/api/users", userRoutes);

// Error-handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global Error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


