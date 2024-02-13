import { login, register } from "controllers/authController";
import express from "express";

const router = express.Router();

/**
 * NOTE
 * 인증 라우터
 * http://localhost:xxxx/auth/...
 */

// http://localhost:xxxx/auth/register
router.post("/register", register);

// http://localhost:xxxx/auth/login
router.post("/login", login);

export default router;
