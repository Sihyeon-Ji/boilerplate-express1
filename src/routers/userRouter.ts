import express from "express";
import {
	getAllUsers,
	deleteUser,
	updateUser,
} from "controllers/userController";
import { isAuthenticated, isOwner } from "middlewares/authMiddleware";

const router = express.Router();

/**
 * NOTE
 * 유저 라우터
 * http://localhost:xxxx/users/...
 */

// http://localhost:xxxx/users
router.get("/", getAllUsers);

// http://localhost:xxxx/users/:id
router.delete("/:id", isOwner, deleteUser);

// http://localhost:xxxx/users/:id
router.patch("/:id", isAuthenticated, isOwner, updateUser);

export default router;
