import express from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";

const router = express.Router();

// http://localhost:xxxx/
router.get("/", (_req, res) => {
	res.json({ message: "welcome!" });
});

/** NOTE 라우터가 새로 생길 때마다 이 아래로 쭉 작성 */
router.use("/auth", authRouter); // http://localhost:xxxx/auth/...
router.use("/users", userRouter); // http://localhost:xxxx/user/...

export default router;
