import express from "express";
import auth from "./auth";
import user from "./user";

const router = express.Router();

// http://localhost:xxxx/
router.get("/", async (_req, res) => {
	res.json({ message: "welcome!" });
});

/** NOTE 라우터가 새로 생길 때마다 이 아래로 쭉 작성 */
// router.use("/comments", requireJWT, comments); // NOTE JWT 인증 예시
router.use("/auth", auth); // http://localhost:xxxx/auth/...
router.use("/users", user); // http://localhost:xxxx/user/...

export default router;
