import cors, { CorsOptions } from "cors";
import express, { urlencoded, json } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import morgan from "morgan";
import router from "routes/index";
import { loadEnv } from "loaders/loadEnv";
import { errorResponser } from "middlewares/errorHandlerMiddleware";
import { loadDBConnection } from "loaders/loadDBConnection";
import "reflect-metadata"; // typedi 관련 설정

/** express */
const app = express();

// // env 파일 사용
loadEnv();

/** JWT 인증, github 연결 예시 코드*/
// loadPassport();

/** 이 백엔드에 요청 가능한 클라이언트 (프론트 URL) */
// 밑에 로그 분기하는 것처럼 서버 환경에 따라 다른 클라이언트를 지정하는 게 좋을 듯
const whitelist = [
	"http://localhost:4000",
	"http://127.0.0.1:4000",
	// "http://dev-seodalgo.kro.kr",
	// "https://seodalgo.co.kr",
];

/** CORS 옵션 */
const corsOptions: CorsOptions = {
	origin: whitelist,
	credentials: true,
	optionsSuccessStatus: 200,
};

/** CORS 이슈 해결 */
app.use(cors(corsOptions));

/** body-parser : x-www-form-urlencoded 형식 처리 */
app.use(urlencoded({ extended: true }));

/** body-parser : 클라이언트 요청 body를 json으로 파싱 처리 */
app.use(
	json({
		limit: "50mb", // 요청 body json 최대 크기
	}),
);

/** 콘솔에 http 요청 응답 로그 찍기 */
if (process.env.NODE_ENV === "production") {
	app.use(morgan("combined")); // 배포환경이면
} else {
	app.use(morgan("dev")); // 개발환경이면
}

/** 웹 사이트를 gzip으로 압축시켜서 로딩 속도가 빨라지게 도와주는 미들웨어 */
app.use(compression());

/** 요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어 */
app.use(cookieParser());

/** 백엔드 서버의 정적파일 접근을 위한 설정 */
//NOTE http://localhost:8010/static/images/kitten.jpg
// app.use("/static", express.static("public"));

/**
 * 프론트 요청 라우팅
 * base url : /
 */
app.use("/", router);

// DB connection
loadDBConnection();

/** 오류처리 미들웨어의 위치는app.use()와 라우트 호출을 정의한 후 맨 마지막에 위치 */
app.use(errorResponser);

/** 백엔드 서버 port env에서 불러오기 */
const PORT = process.env.API_PORT;

/** 콘솔 실행 로그 실행 환경에 따라 다르게 만들기 */
// let hostName: string;
// switch (process.env.NODE_ENV) {
// 	case "production":
// 		hostName = "seodalgo.co.kr";
// 		break;
// 	case "development":
// 		hostName = "dev-seodalgo.kro.kr";
// 		break;
// 	default:
// 		hostName = "localhost";
// }

/** port listen */
app.listen(PORT, () => {
	console.log(`
	┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
	┃   Server listening on port: ${PORT}    ┃
	┃     http://localhost:${PORT}           ┃
	┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
	`);
	// console.log(`
	// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
	// ┃   Server listening on port: ${PORT}    ┃
	// ┃     http://${hostName}:${PORT}     ┃
	// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
	// `);
});
