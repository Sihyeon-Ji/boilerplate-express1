/**
 * NOTE
 * .d.ts 선언 파일 예시
 *  @types/example_module.d.ts 파일
 *
 * type UserDTO = {
 *     name: string;
 *     email: string;
 * }
 *
 * interface Config {
 *      source: string;
 * }
 *
 * //모듈이름 선언 (.d.ts파일을 구현하는 모듈 이름과 일치시킴)
 * declare module 'example_module' {
 *
 *      //함수 Type 선언
 *      function init(config: Config): UserDTO;
 *
 * }
 * */
