import crypto from "crypto";

//SECTION - authUtils

/**
 * 인증, 암호화, 복호화와 관련된 함수들을 모아둡니다.
 * @author Sean <shji@dtol.co.kr>
 */

//
const SECRET = "SIHYEON-MADE-THIS-SECRET";

/**
 *  NOTE - 무결성 체크 함수
 *  @function authentication
 *  HMAC(Hashed Message Authentication Code)는 데이터의 신뢰성과 무결성을 확인하는 데 일반적으로 사용되는 일종의 메시지 인증 코드(MAC)이다.
 *  HMAC은 비밀 키를 사용하여 데이터의 무결성과 신뢰성을 확인하는데 사용할 수 있는 고정 길이 메시지 인증 코드를 생성하는 암호화 알고리즘인 것이다.
 *  HMAC 알고리즘은 비밀 키와 메시지라는 두 가지를 입력받는다. 그런 다음 메시지와 비밀 키에 해시 함수(SHA-256, SHA-512)를 적용하여 고정 길이 인증 코드를 생성한다.
 *  그런 다음 결과 인증 코드를 메시지와 함께 보낼 수 있으며, 수신자는 동일한 키와 해시 기능을 사용하여 메시지의 진위와 무결성을 확인할 수 있다.
 *  HMAC은 인터넷과 같이 안전하지 않은 네트워크를 통해 데이터를 전송해야 하는 상황에서 자주 사용한다.
 *  HMAC을 사용하면 발신자와 수신자 모두 데이터가 전송 중에 변조되거나 수정되지 않았는지를 확인할 수 있다.
 *  다른 유형의 메시지 인증 코드에 비해 HMAC은 충돌 공격 및 길이 확장 공격과 같은 특정 유형의 공격에 대한 내성이 높다.
 *  HMAC은 또한 상대적으로 구현하기 쉽고 많은 프로그래밍 언어와 암호화 라이브러리에서 지원된다는 장점이 있다.
 *  전반적으로 HMAC은 데이터의 신뢰성과 무결성을 확인하기 위한 강력한 도구이며 전자 상거래, 온라인 뱅킹 및 보안 메시징 시스템을 비롯한 다양한 응용 프로그램에서 사용된다.
 **/
export const authentication = (salt: string, password: string): string => {
	return crypto
		.createHmac("sha256", [salt, password].join("/"))
		.update(SECRET)
		.digest("hex");
};

//!SECTION
