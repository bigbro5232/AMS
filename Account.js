// 07/26


const AccountError = require("./Account-error")
// 입출금 계좌
class Account {
    constructor(number, owner, password, balance) {
        this.number = number;
        this.owner = owner;
        this.password = password;
        this.balance = balance;
    }
    // 입금하기
    deposit(money) {
        return this.balance += money;
    }
    // 출금하기
    // 대출 계좌에서 잔액이 음수일시 오류코드가 아닌 대출금액으로
    withdraw(money) {
        if (this.balance < money) {
            throw new AccountError(`잔액이 부족합니다.`, 200);
        } else {
            return this.balance -= money;
        }
    }
    // 잔액조회
    getBalance() {
        return this.balance;
    }
    // 비밀번호 확인
    checkPassword() {
        if (this.password === password) {
            return console.log(`${this.owner}님 본인인증 되었습니다.`);
        } else {
            throw new AccountError(`비밀번호 오류`, 100);
        }
    }
    // 전체 출력문
    toString() {
        return `${this.number},${this.owner},${this.balance}`;
    }
}
// const account = new Account("1111", "A", "1234", "10000");
// try {
//     account.withdraw(100000);
// } catch (error) {
//     console.log(error.toString());
// }
module.exports = Account;