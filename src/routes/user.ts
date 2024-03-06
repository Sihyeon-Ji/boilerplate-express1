import express from "express";
import {
	getAllUsers,
	deleteUser,
	updateUser,
} from "controllers/userController";
import { isAuthenticated, isOwner } from "middlewares/authMiddleware";
import { asyncErrorCatcher } from "middlewares/errorHandlerMiddleware";

const router = express.Router();

/**
 * NOTE
 * 유저 라우터
 * http://localhost:xxxx/users/...
 */

// http://localhost:xxxx/users
router.get("/", asyncErrorCatcher(getAllUsers));

// http://localhost:xxxx/users/:id
router.delete(
	"/:id",
	asyncErrorCatcher(isOwner),
	asyncErrorCatcher(deleteUser),
);

// http://localhost:xxxx/users/:id
router.patch(
	"/:id",
	asyncErrorCatcher(isAuthenticated),
	asyncErrorCatcher(isOwner),
	asyncErrorCatcher(updateUser),
);

export default router;
