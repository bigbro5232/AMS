// 07/30

class AccountError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code
    }

    set code(code) {
        this._code = code;
    }
    get code() {
        return this._code;
    }

    toString() {
        return `오류코드: ${this.code}\t오류메세지: ${this.message}`;
    }
}
module.exports = AccountError;