import path from "path";

//SECTION - pathUtils

/**
 * path 관련 유틸 함수
 * @author Sean <shji@dtol.co.kr>
 */

/**
 *  NOTE - path 만들기 함수
 *  @function makeSheetsPathFunction
 *  @description 엑셀 다운로드 기능을 만들 때, 개발 환경에 맞는 적절한 path를 만드는 유틸 함수입니다.
 *  @param {string} directory sheets 밑의 디렉토리명
 *  @param {string} fileName 파일명과 확장자
 *  @returns {string}
 **/
export const makeSheetsPathFunction = (directory: string, fileName: string) => {
	let pathStr: string = "";
	// if (process.env.NODE_ENV === "local") {
	// 	pathStr = path.join(
	// 		path.resolve(),
	// 		"static",
	// 		"sheets",
	// 		directory,
	// 		fileName,
	// 	);
	// } else {
	// 	pathStr = path.join(
	// 		path.resolve(),
	//      "dist",
	// 		"static",
	// 		"sheets",
	// 		directory,
	// 		fileName,
	// 	);
	// }
	pathStr = path.join(
		path.resolve(),
		"directoryName",
		"directoryName",
		directory,
		fileName,
	);
	return pathStr;
};

//!SECTION
