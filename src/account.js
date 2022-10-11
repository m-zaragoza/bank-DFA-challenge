class Account {

    #balance = 0;
    #transactions = [];

    getBalance = () => this.#balance;

    getTransactions = () => this.#transactions;

    addTransaction = transactionInstance => this.#transactions.push(transactionInstance);

    movement = transactionInstance =>
        transactionInstance.getType() === `debit` && transactionInstance.getAmount() <= this.#balance ?
            this.#balance -= transactionInstance.getAmount() :
            transactionInstance.getType() === `credit` ?
                this.#balance += transactionInstance.getAmount() :
                new Error(`Insufficient balance.`)
};

module.exports = Account;
