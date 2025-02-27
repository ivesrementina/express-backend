import { Router } from "express";
import * as userController from "../controllers/userController";
import { validateUser } from "../middlewares/UserSchema";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/", validateUser, userController.createUser); // Apply validation
router.get("/:id", userController.getUserById);
router.put("/:id", validateUser, userController.updateUser); // Apply validation
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.loginUser); // ✅ Login route

export default router;


