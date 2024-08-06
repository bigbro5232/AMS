// 07/26
const Account = require("./Account")
// 마이너스 계좌
class MinusAccount extends Account {
    // 대출금액 프로퍼티 추가
    // 생성자 상속
    constructor(number, owner, password, balance, minusBalance) {
        super(number, owner, password, balance)
        // 대출계좌에 새로 추가된 프로퍼티
        this.minusBalance = minusBalance;
    }
    // getter/setter 추가
    // number
    set number(number) {
        this._number = number;
    }
    get number() {
        return this._number;
    }
    // owner
    set owner(owner) {
        this._owner = owner;
    }
    get owner() {
        return this._owner;
    }
    // password
    set password(password) {
        this._password = password;
    }
    get password() {
        return this._password;
    }
    // balance
    set balance(balance) {
        if (this.balance <= 0) {
            console.log(`0`);
        } else {
            this._balance = balance;
        }
    }
    get balance() {
        return this._balance;
    }
    // minusBalance
    set minusBalance(minusBalance) {
        this._minusBalance = minusBalance;
    }
    get minusBalance() {
        return this._minusBalance;
    }
    // withdraw() 재정의
    // 메서드안에 잔액 확인 후 출금액보다 잔액이 적으면 오류코드 발생
    // 대출 계좌에서는 출금액이 잔액보다 많아도 대출금액으로 표현

    // super() 메서드를 사용 않했음, 차후 이용하여 재시도 해볼것
    // 현시점 메서드를 재사용하지 않았음으로 메서드 재정의 필요.

    // 메서드안에 조건문에 상속받은 메서드 재사용 불가능 확인
    // 결과값이 NaN이 나옴

    withdraw(money) {
        if (this.balance >= money) {
            return this.balance -= money
        } else {
            this.balance = "0";
            this.minusBalance = (this.balance - money);
        }
    }
    // toString() 재정의
    // Account클래스에서 상속받아온 toString()메서드 활용
    toString() {
        return `${this.number},${this.owner},${this.balance},${this.minusBalance}`;
    }
    // getBalance() 재정의
    getBalance() {
        if (this.balance > 0) {
            return console.log(`${this.owner}님의 잔액은 ${this.balance}원입니다.`);
        } else {
            return console.log(`${this.owner}님의 대출 금액은 ${this.minusBalance}원입니다.`);
        }
    }
}
module.exports = MinusAccount;