const Account = require("./src/account");
const Transaction = require("./src/transaction");
const Statement = require("./src/statement");

class Main {
    static main() {
        const myAccount = new Account();

        const trans1 = new Transaction(2012, 1, 10, `credit`, 1000);
        const trans2 = new Transaction(2012, 1, 13, `credit`, 2000);
        const trans3 = new Transaction(2012, 1, 14, `debit`, 500);

        const statement = new Statement(myAccount);

        myAccount.movement(trans1);
        trans1.setBalance(myAccount);
        myAccount.movement(trans2);
        trans2.setBalance(myAccount);
        myAccount.movement(trans3);
        trans3.setBalance(myAccount);

        myAccount.addTransaction(trans1);
        myAccount.addTransaction(trans2);
        myAccount.addTransaction(trans3);

        statement.format();
        statement.print();

    };
};

module.exports = Main;
Main.main();

