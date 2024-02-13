//SECTION - objectUtils

/**
 * 객체 배열이나 객체 등에서 사용하기 좋은 함수들을 모아둡니다.
 * @author Sean <shji@dtol.co.kr>
 */

/**
 *  NOTE - 객체 배열 키 값 더하기 함수
 *  @function sumFromArrayOfObject
 *  @description 객체 배열 안의 특정 키 값을 모두 sum하는 함수입니다.
 **/
export const sumFromArrayOfObject = (array: Array<any>, key: string) => {
	return array
		.map((item) => item[key])
		.reduce((prev, current) => prev + current, 0);
};

//!SECTION
