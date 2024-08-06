const { createInterface } = require("readline");
const Account = require("./Account");
const MinusAccount = require("./MinusAccount");
const AccountRepository = require("./AccountRepository");
const { readFile } = require("fs");
const accountRepository = new AccountRepository();
const fs = require("fs").promises;
const constants = require("fs").constants;
// 키보드 입력을 위한 인터페이스 생성
const fs = require('fs');
const filePath = 'example.txt';



/*
어플리케이션 실행시 계좌 정보를 (ams.json)json파일로 존재여부 확인 후
있으면 parse메서드로 읽어서 AccountRepository배열에 초기화 시키고,
없으면 빈 (ams.json)json파일 생성 
json 파일의 내용은 내부의 내용처리 끝나고 마지막에 실행을 종료할 때
업데이트하는 개념으로 처리, 실시간으로 싱크를 맞춰서 만드는건 보류.
*/
const consoleInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 키보드 입력 받기
const readLine = function (message) {
    return new Promise((resolve) => {
        consoleInterface.question(message, (userInput) => {
            resolve(userInput);
        }); 2

    });
}

// 메뉴 출력
const printMenu = function () {
    console.log("--------------------------------------------------------------------");
    console.log("1.계좌등록 | 2.계좌목록 | 3.예금 | 4.출금 | 5.검색 | 6.삭제 | 7.종료");
    console.log("--------------------------------------------------------------------");
}

const app = async function () {
    console.log(`====================================================================`);
    console.log(`--------------     KOSTA 은행 계좌 관리 프로그램     ---------------`);
    console.log(`====================================================================`);

    let running = true;
    while (running) {
        fs.access('./account.json',constants.F_OK|constants.W_OK|constants.R_OK)
        .then(()=>{
            return fs.readFile('./account.json')
        })
        .then((data)=>{
            // 여기까지 08/05
        })
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
                let account = null; //입력갑 대입시 Acccount 또는 Minusaccoun에 등록될 배열 값
                let no = parseInt(await readLine("> "));
                let accountNum = await readLine("- 계좌번호 : ");
                let accountOwner = await readLine("- 예금주명 : ");
                let password = parseInt(await readLine("- 비밀번호 : "));
                let balance = parseInt(await readLine("- 입금액 : "));
                let minusBalance = 0;
                function result(acc) {
                    if (acc instanceof MinusAccount) {
                        console.log(`마이너스계좌 \t ${acc.number} \t ${acc.owner} \t ${acc.balance} \t ${acc.minusBalance}`);
                    } else {
                        console.log(`입출금계좌 \t ${acc.number} \t ${acc.owner} \t ${acc.balance}`);
                    }
                }
                if (no === 1) {
                    account = new Account(accountNum, accountOwner, password, balance);
                    accountRepository.addAcount(account);
                } else {
                    minusBalance = parseInt(await readLine("- 대출금액 : "));
                    account = new MinusAccount(accountNum, accountOwner, password, balance, minusBalance);
                    accountRepository.addAcount(account);
                }

                // 신규 계좌 등록
                // console.log("신규 계좌 등록 결과 메시지 출력");
                console.log("계좌구분 \t 계좌번호 \t 예금주 \t  잔액 \t 대출금액");
                result(account);
                break;
            case 2: // 전체계좌 목록 출력
                console.log("-------------------------------------------------------");
                console.log("계좌구분 \t 계좌번호 \t 예금주 \t  잔액");
                const allList = accountRepository.findByAll();
                allList.forEach((account) => {
                    result(account);
                });
                ("-------------------------------------------------------");
                break;
            case 3: // 입금
                // 계좌번호와 입금액 입력 받아 입금 처리
                let inputNo = await readLine("- 계좌번호 : ");
                let inputMoney = parseInt(await readLine("- 입금액 : "));
                // const allAcc = accountRepository.findByAll();
                let addMoney = accountRepository.findByNumber(inputNo);
                // if (inputNo === allAcc.number) {
                addMoney.deposit(inputMoney);
                // } else {
                //     inputNo = await readLine("- 틀린 계좌번호, 다시입력 : ");
                //     return;
                // }
                // console.log(inputNo, inputMoney);
                // console.log("입금에 따른 메시지 출력");
                console.log(`잔액 :  ${addMoney.getBalance().toString()}`);
                break;
            case 4: // 출금
                // 계좌번호와 출금액 입력 받아 출금 처리
                let outputNo = await readLine("- 계좌번호 : ");
                let outputMoney = parseInt(await readLine("- 출금액 : "));
                const minusMoney = accountRepository.findByNumber(outputNo);
                minusMoney.withdraw(outputMoney);
                // console.log(outputNo, outputMoney);
                // console.log("출금에 따른 메시지 출력");
                console.log(`잔액 :  ${minusMoney.getBalance().toString()}`);
                break;
            case 5: // 계좌번호로 검색
                // 계좌 번호 입력 받아 계좌 정보 출력
                let searchNum = await readLine("- 계좌번호 : ");
                const findNumber = accountRepository.findByNumber(searchNum);
                console.log(searchNum);
                // console.log("검색 결과 출력");
                console.log("-------------------------------------------------------");
                console.log("계좌구분 \t 계좌번호 \t 예금주 \t  잔액");
                result(findNumber);
                break;
            case 6:
                console.log("계좌 삭제");
                // 계좌 번호 입력 받아 계좌 해당 계좌 삭제
                let deleteNum = await readLine("- 계좌번호 : ");
                accountRepository.deleteAccount(deleteNum);
                console.log(deleteNum);
                // console.log("삭제 결과 출력");
                // console.log("계좌 목록 출력~~~~");
                console.log("-------------------------------------------------------");
                console.log("계좌구분 \t 계좌번호 \t 예금주 \t  잔액");
                const aList = accountRepository.findByAll();
                aList.forEach((account) => {
                    result(account);
                });
                ("-------------------------------------------------------");
                break;
            case 7:
                console.log(">>> 프로그램을 종료합니다.");
                consoleInterface.close();
                running = false;
                break;
            default: console.log("잘못 선택하셨습니다.");
        }
    }
}

app();
