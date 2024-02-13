import crypto from "crypto";

//SECTION - stringUtils

/**
 * 랜덤 문자열 생성, 비밀번호 만들기 등 문자열 관련 유틸 함수들을 모아둡니다.
 * @author Sean <shji@dtol.co.kr>
 */

/**
 *  NOTE - 랜덤 문자열 생성 함수
 *  @function makeRandomString
 *  @description base64로 인코딩 된 128 바이트의 문자열을 생성합니다.
 **/
export const makeRandomString = () =>
	crypto.randomBytes(128).toString("base64");

//!SECTION
