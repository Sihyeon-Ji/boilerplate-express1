import { ResBaseVO } from "types/common/ResBaseVO";
import { Request, Response } from "express";
import { returnTrueFunction } from "services/sampleService";

/**
 * NOTE
 * 샘플 컨트롤러
 * route의 요청이 유효한지 판단합니다.
 *
 * 기존 방식대로 컨트롤러에서 서비스를 호출하고
 * 그 결과에 따라
 * 이곳에서 HTTP 응답을 반환해줍니다.
 *  Request(요청)을 받아 Service에게 비즈니스 로직 처리를 위임하고, 처리의 결과를 Response(응답)하는 역할
 */

const resBaseVO: ResBaseVO<unknown> = {
	resultCd: 200,
	resultMsg: "success",
	resultMsgTyp: "",
	data: null,
};

export const returnTest = (
	req: Request,
	res: Response,
	// _next: NextFunction,
) => {
	// 서비스 호출
	const result = returnTrueFunction(req, res);
	if (result) {
		resBaseVO.resultCd = 200;
		resBaseVO.resultMsg = "test success!";
		res.json(resBaseVO);
	} else {
		resBaseVO.resultCd = 400;
		resBaseVO.resultMsg = "bad request";
		res.status(400).json(resBaseVO); // NOTE 이처럼 HTTP 응답 코드 자체를 커스텀 가능
	}
	/** NOTE
	 * 아래처럼 특정 응답을 한 번 이상 보내려고 하면
	 * [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client가 나옴
	 * README.md 파일 참고 바람.
	 */
	// res.json({ message: "welcome!" });
	// res.status(200).send("seodalgo! excel! wow!");
	//
};
