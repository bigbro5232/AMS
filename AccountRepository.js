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
            // return fs.access("./javascript-advence/AMS-/accounts.txt", constants.F_OK)
            //     .then(() => { })
            //     .catch((error) => {
            //         if (error.code !== "ENONET") {
            //             return fs.writeFile("./javascript-advence/AMS-/accounts.txt", this.accounts.toString())
            //                 .then(() => { })
            //                 .catch((err) => { console.log(err); });
            //         }
            //         return console.error(error.message);
            //     });
        } else {
            // 기존에 예외처리 형식을 나타내기 위해 false값을 줬지만
            // 예외처리 구문을 통해여 클래스에서 상속받아 구현
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

        // fs.readFiles("./javascript-advence/AMS-/accounts")
        //     .then((data) => {
        //         data.toString();
        //     })
        //     .catch((error) => {
        //         console.error(error.message);
        //     });
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
}
module.exports = AccountRepository;