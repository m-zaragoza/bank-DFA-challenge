class Transaction {

    #date;
    #type;
    #amount;
    #balance;

    constructor(YYYY, MM, DD, type, amount) {

        this.#date = Number.isInteger(YYYY && MM && DD) ? new Date(YYYY, MM, DD)
            : new Error(`Please provide a transaction date: YYYY, MM, DD.`);

        this.#type = !type ? new Error(`Please provide a transaction type: debit or credit.`) : type.toLowerCase();

        this.#amount = amount <= 0 ? new Error(`Please provide a valid amount.`) : amount;
    }

    getDate = () => this.#date;

    getType = () => this.#type;

    getAmount = () => this.#amount;

    setBalance = accountInstance =>
        this.#balance = accountInstance.getBalance();

    getBalance = () => this.#balance;
};

module.exports = Transaction;