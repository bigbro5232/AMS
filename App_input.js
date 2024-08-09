const { createInterface } = require("readline");
const fs = require("fs").promises;
const constants = require("fs").constants;
const Account = require("./Account");
const MinusAccount = require("./MinusAccount");
const AccountRepository = require("./AccountRepository");
const accountRepository = new AccountRepository();

// 키보드 입력을 위한 인터페이스 생성
const consoleInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 키보드 입력 받기
const readLine = function (message) {
    return new Promise((resolve) => {
        consoleInterface.question(message, (userInput) => {
            resolve(userInput);
        });
    });
}

// 메뉴 출력
const printMenu = function () {
    console.log("--------------------------------------------------------------------");
    console.log("1.계좌등록 | 2.계좌목록 | 3.예금 | 4.출금 | 5.검색 | 6.삭제 | 7.종료");
    console.log("--------------------------------------------------------------------");
}

// JSON 파일을 읽어 AccountRepository 객체 초기화
function start() {
    fs.access('./ams.json', constants.F_OK)
        .then(() => {
            return fs.readFile('./ams.json');
        })
        .then((data) => {
            const accounts = JSON.parse(data);
            accounts.forEach(acc => {
                if (acc.minusBalance !== undefined) {
                    accountRepository.addAcount(new MinusAccount(acc.number, acc.owner, acc.password, acc.balance, acc.minusBalance));
                } else {
                    accountRepository.addAcount(new Account(acc.number, acc.owner, acc.password, acc.balance));
                }
            });
        })
        .catch((err) => {
            if (err.code === 'ENOENT') {
                return fs.writeFile('./ams.json', JSON.stringify([]));
            } else {
                console.log(err.message);
            }
        });
};

// 현재 상태를 JSON 파일에 저장
async function save() {
    const accounts = accountRepository.findByAll().map(acc => {
        if (acc instanceof MinusAccount) {
            return {
                number: acc.number,
                owner: acc.owner,
                password: acc.password,
                balance: acc.balance,
                minusBalance: acc.minusBalance
            };
        } else {
            return {
                number: acc.number,
                owner: acc.owner,
                password: acc.password,
                balance: acc.balance
            };
        }
    });
    await fs.writeFile('./ams.json', JSON.stringify(accounts, null, 2));
}

// 출력문
function result(acc) {
    if (acc instanceof MinusAccount) {
        console.log(`마이너스계좌 \t ${acc.number} \t ${acc.owner} \t ${acc.balance} \t ${acc.minusBalance}`);
    } else {
        console.log(`입출금계좌 \t ${acc.number} \t ${acc.owner} \t ${acc.balance}`);
    }
}

// 계좌 입력 오류시 출력문
async function errorAccount() {
    while (true) {
        const inputNo = await readLine("- 계좌번호 : ");
        const findAccount = accountRepository.findByAll().find((account) => account.number === inputNo);
        if (findAccount) {
            return inputNo;
        } else {
            console.log("틀린 계좌번호 입니다. 다시 입력해 주세요.");
        }
    }
}

async function inputValid(inputMsg, errMsg, iValue) {
    while (true) {
        iValid = await readLine(inputMsg);
        if (iValue.test(iValid)) {
            return iValid;
        } else {
            console.log(errMsg);
        }
    }
}

const app = async function () {
    start();

    console.log(`====================================================================`);
    console.log(`--------------     KOSTA 은행 계좌 관리 프로그램     ---------------`);
    console.log(`====================================================================`);

    let running = true;
    while (running) {
        printMenu();
        let menuNum = parseInt(await readLine("> "));
        switch (menuNum) {
            case 1:
                // createAccount();
                console.log("■ 등록 계좌 종류 선택");
                const header =
                    "--------------------------------\n" +
                    "1. 입출금계좌 | 2. 마이너스 계좌\n" +
                    "--------------------------------";
                console.log(header);
                let account = null;
                let no;
                while (true) {
                    no = parseInt(await readLine("> "));
                    if (no === 1 || no === 2) {
                        break;
                    } else {
                        console.log("잘못 선택하셨습니다.");
                    }
                }
                let accountNum = await inputValid("- 계좌번호 : ", "계좌번호는 8자리 숫자여야 합니다.", /^\d{8}$/);
                let accountOwner = await inputValid("- 예금주명 : ", "이름은 2자리 이상이여야 합니다.", /^\W{2,}$/);
                let password = await inputValid("- 비밀번호 : ", "비밀번호는 4자리 숫자여야 합니다.", /^\d{4}$/);
                let balance = await inputValid("- 입금액 : ", "숫자만 입력할 수 있습니다.", /^\d{1,}$/);
                let minusBalance = 0;
                if (no === 1) {
                    account = new Account(accountNum, accountOwner, password, balance);
                    accountRepository.addAcount(account);
                } else {
                    minusBalance = parseInt(await readLine("- 대출금액 : "));
                    account = new MinusAccount(accountNum, accountOwner, password, balance, minusBalance);
                    accountRepository.addAcount(account);
                }

                // 신규 계좌 등록
                console.log("계좌구분 \t 계좌번호 \t 예금주 \t 잔액 \t 대출금액");
                result(account);
                break;
            case 2: // 전체계좌 목록 출력
                console.log("-------------------------------------------------------");
                console.log("계좌구분 \t 계좌번호 \t 예금주 \t 잔액");
                const allList = accountRepository.findByAll();
                allList.forEach((account) => {
                    result(account);
                });
                console.log("-------------------------------------------------------");
                break;
            case 3: // 입금
                // 계좌번호와 입금액 입력 받아 입금 처리
                let inputNo = await errorAccount();
                let inputMoney = parseInt(await readLine("- 입금액 : "));
                let addMoney = accountRepository.findByNumber(inputNo);
                addMoney.deposit(inputMoney);
                console.log(`잔액 :  ${addMoney.getBalance().toString()}`);
                break;
            case 4: // 출금
                // 계좌번호와 출금액 입력 받아 출금 처리
                let outputNo = await errorAccount();
                let outputMoney = parseInt(await readLine("- 출금액 : "));
                const minusMoney = accountRepository.findByNumber(outputNo);
                minusMoney.withdraw(outputMoney);
                console.log(`잔액 :  ${minusMoney.getBalance().toString()}`);
                break;
            case 5: // 계좌번호로 검색
                // 계좌 번호 입력 받아 계좌 정보 출력
                let searchNum = await errorAccount();
                const findNumber = accountRepository.findByNumber(searchNum);
                console.log("-------------------------------------------------------");
                console.log("계좌구분 \t 계좌번호 \t 예금주 \t 잔액");
                result(findNumber);
                break;
            case 6:
                console.log("계좌 삭제");
                // 계좌 번호 입력 받아 계좌 해당 계좌 삭제
                let deleteNum = await errorAccount();
                accountRepository.deleteAccount(deleteNum);
                console.log("-------------------------------------------------------");
                console.log("계좌구분 \t 계좌번호 \t 예금주 \t 잔액");
                const aList = accountRepository.findByAll();
                aList.forEach((account) => {
                    result(account);
                });
                console.log("-------------------------------------------------------");
                break;
            case 7:
                console.log(">>> 프로그램을 종료합니다.");
                save();
                consoleInterface.close();
                running = false;
                break;
            default: console.log("잘못 선택하셨습니다.");
        }
    }
}

app();
