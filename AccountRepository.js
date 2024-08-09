// 07/26

// const AccountError = require("./Account-error")
// const fs = require("fs").promises;
// const constants = require("fs").constants;
/**
 * 계좌 관리 객체
 */
class AccountRepository {
    constructor() {
        this.accounts = [];
    }
    // setter/getter
    set accounts([]) {
        this._accounts = [];
    }
    get accounts() {
        return this._accounts;
    }

    // 계좌 관리 주요 기능
    // 신규 계좌 등록
    addAcount(account) {
        if (this.accounts.indexOf(account) === -1) {
            this.accounts.push(account)
        } else {
            return false;
        }
    }

    // 전체 계좌 목록 반환
    findByAll() {
        // 복사본 반환
        // return this.accounts.map(element => element);
        return [...this.accounts];
        // (async () => {
        //     try {
        //         let result = await fs.readFile("./javascript-advence/AMS-/accounts.txt")
        //         console.log(result.toString());
        //     } catch (error) {
        //         console.log(error);
        //     }
        // })();
    }


    // 계좌 번호로 조회하여 반환
    findByNumber(number) {
        // for (const acc of this.accounts) {
        //     if (acc.number === number) {
        //         return acc;
        //     }
        // }
        return this.accounts.find(account => account.number === number)
    }
    // 예금주명으로 조회하여 반환
    findByName(name) {
        // this.accounts.find((acc) => {
        //     acc.owner === name
        // });
        // for (const acc of this.accounts) {
        //     if (acc.owner === name) {
        //         return acc;
        //     }
        // }
        return this.accounts.filter(account => account.owner === name)
    }

    // 모든 걔좌의 총 금액
    totalBalance() {
        // let sum = 0;
        // for (const acc of this.accounts) {
        //     sum += acc.balance;
        // }
        // return sum;
        return this.accounts.reduce((acc, account) => acc + account.getBalance(), 0);
    }
    // 계좌 잔액중에서 최대
    maxBalance() {
        // 계좌가 없을 경우
        // if (this.accounts.length === 0) {
        //     return null;
        // }
        // return this.accounts.reduce((accumulator, acc) => {
        //     if (accumulator > acc.balance) {
        //         return accumulator;
        //     }
        //     return acc.balance;
        // }, 0);
        return this.accounts.reduce((acc, account) => acc > account.balance ? acc : account.balance, 0)
    }
    // 계좌 잔액중에서 최소
    minBalance() {
        // 계좌가 없을 경우
        // if (this.accounts.length === 0) {
        //     return null;
        // }
        // return this.accounts.reduce((accumulator, acc) => {
        //     if (accumulator < acc.balance) {
        //         return accumulator;
        //     }
        //     return acc.balance;
        // }, this.accounts[0].balance);
        return this.accounts.reduce((acc, account) => acc < account.balance ? acc : account.balance, this.accounts[0].balance)
    }
    // 특정 범위의 잔액 조회
    findSomeMoney(num1, num2) {
        return this.accounts.filter((account) => num1 <= account.balance && account.balance <= num2);
    }
    // 이름을 받아 계좌 예금주명을 수정
    updateName(accountNumber, newOwner) {
        let findAccount = this.accounts.find((account) => account.number === updateAccount.number)
        console.log(findAccount);
        if (findAccount) {
            findAccount.name = updateAccount.name;
            return true;
        }
        return false;
    }
    // 계좌 삭제하기
    deleteAccount(number) {
        let index = this.accounts.findIndex((account) => account.number === number)
        if (index != -1) {
            return this.accounts.splice(index, 1);
        }
        return null;

    }
}
module.exports = AccountRepository;