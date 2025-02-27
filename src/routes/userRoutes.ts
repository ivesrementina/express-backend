import { Router } from "express";
import * as userController from "../controllers/userController";
import { validateUser, validateUserUpdate  } from "../middlewares/UserSchema";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/", validateUser, userController.createUser); // Apply validation
router.get("/:id", userController.getUserById);
router.put("/:id", validateUserUpdate, userController.updateUser); // ✅ Uses partial validation
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.loginUser); // ✅ Login route

export default router;


