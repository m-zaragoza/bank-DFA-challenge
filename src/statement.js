class Statement {

    #movements;
    #formattedStatement;

    constructor(accountInstance) {
        this.#movements = accountInstance.getTransactions();
    }

    format = () =>
        this.#formattedStatement = this.#movements.map(tran => `${tran.getDate().getDate()}/${tran.getDate().getMonth() !== 10 || 11 || 12 ? `0` + tran.getDate().getMonth() : tran.getDate().getMonth()}/${tran.getDate().getUTCFullYear()} || ${tran.getType() === `credit` ? Number(tran.getAmount()).toFixed(2) : `       `} || ${tran.getType() === `debit` ? Number(tran.getAmount()).toFixed(2) : `      `} || ${Number(tran.getBalance()).toFixed(2)}`);


    print = () => {
        console.log(`Date       || Credit  || Debit  || Balance`);
        for (let i = this.#formattedStatement.length - 1; i >= 0; i--) {
            console.log(this.#formattedStatement[i]);
        };
    };
};

module.exports = Statement;