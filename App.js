// 07/06 

const Account = require("./Account");
const AccountError = require("./Account-error")
// const MinusAccount = require("./MinusAccount");
const AccountRepository = require("./AccountRepository");
/***
 * 은행 직원용 계좌 관리 애플리케이션
 * 작성자 : 조하영
 */

console.log("[ KOSTA BANK 계좌 관리 프로그램]");
const accountRepository = new AccountRepository();
// 신규 계좌 등록
const account = new Account("1234-5678", "조하영", 1234, 10000); // 가능하면 클로저 이용으로 계좌관리
const account1 = new Account("2234-5678", "홍길동", 1234, 50000); // 가능하면 클로저 이용으로 계좌관리
const account2 = new Account("3234-5678", "이재명", 1234, 20000); // 가능하면 클로저 이용으로 계좌관리
const account3 = new Account("4234-5678", "박찬호", 1234, 100000); // 가능하면 클로저 이용으로 계좌관리
// const maccount = new MinusAccount("1234-5678", "조하영", 1234, 10000, 0);

try {
    accountRepository.addAcount(account);
} catch (error) {
    console.log(error.toString());
}
try {
    accountRepository.addAcount(account1);
} catch (error) {
    console.log(error.toString());
}
try {
    accountRepository.addAcount(account2);
} catch (error) {
    console.log(error.toString());
}
try {
    accountRepository.addAcount(account3);
} catch (error) {
    console.log(error.toString());
}
// 기존에 등록 실패를 if문을 이용하여 예외처리 했지만
// 에외 처리 클래스를 만들어 try-catch문으로 예외처리 구현
// 같은방식으로 다른 메서드도 예외처리 가능
// try {
//     accountRepository.addAcount(account3);
// } catch (error) {
//     console.log(error.toString());
// }
// 전체계좌 출력
console.log("==============================");
console.log("전체 계좌 목록 반환");
const accounts = accountRepository.findByAll();
console.log(accounts);
console.log("==============================");
console.log("계좌 번호로 조회하여 반환");
const findNum = accountRepository.findByNumber("3234-5678");
console.log(findNum);
console.log("==============================");
console.log("예금주명으로 조회하여 반환");
const findName = accountRepository.findByName("박찬호");
console.log(findName);
console.log("==============================");
console.log("모든 걔좌의 총 금액");
const totalMoney = accountRepository.totalBalance();
console.log(totalMoney);
console.log("==============================");
console.log("계좌 잔액중에서 최대");
const maxMoney = accountRepository.maxBalance();
console.log(maxMoney);
console.log("==============================");
console.log("계좌 잔액중에서 최소");
const minMoney = accountRepository.minBalance();
console.log(minMoney);
console.log("==============================");
console.log("특정 범위의 잔액 조회, 입력잔액 이상만 출력");
const selecMoney = accountRepository.findSomeMoney(5000, 50000);
console.log(selecMoney);
console.log("==============================");
// console.log("이름을 받아 계좌 예금주명을 수정");
// const updateOwner = accountRepository.updateName("1234-5678", "손흥민");
// console.log(updateOwner);
// console.log("==============================");
// 계좌종류 계좌번호 예금주명 비밀번호(****) 현재잔액
// =================================s==============

// sort()이용 정렬
// 입출금계좌-------------------------------------
// 마이너스 계좌----------------------------------


//
//


console.log("[ KOSTA BANK 계좌 관리 프로그램 종료]");