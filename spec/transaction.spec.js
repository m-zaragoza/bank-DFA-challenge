const Transaction = require("../src/transaction.js")

describe(`Transaction tests`, () => {

    let testTransaction, balanceSpy;

    const testAccount = {
        balance: 500,
        getBalance() {
            return this.balance;
        }
    };

    describe(`Instance of Transaction- date`, () => {
        it(`should be an instance of Date`, () => {

            testTransaction = new Transaction(2022, 05, 11);
            expect(testTransaction.getDate()).toBeInstanceOf(Date);
        });

        it(`should throw an error if date input is not correct (not numbers)`, () => {

            testTransaction = new Transaction(`hh`, `jj`, `ll`);
            expect(testTransaction.getDate()).toBeInstanceOf(Error);
        });
    });

    describe(`Instance of Transaction- type`, () => {
        it(`should return the type in lower case`, () => {

            testTransaction = new Transaction(2022, 05, 11, `Debit`);
            expect(testTransaction.getType()).toBe(`debit`);
        });

        it(`should throw an error when type is not declared`, () => {

            testTransaction = new Transaction(2022, 05, 11);
            expect(testTransaction.getType()).toBeInstanceOf(Error);
        });
    });

    describe(`Instance of Transaction- amount`, () => {
        it(`should throw an error when amount is less than 0`, () => {

            testTransaction = new Transaction(2022, 05, 11, `CREDIT`, -50);
            expect(testTransaction.getAmount()).toBeInstanceOf(Error);
        });

        it(`should be the input amount`, () => {

            testTransaction = new Transaction(2022, 05, 11, `CREDIT`, 50);
            expect(testTransaction.getAmount()).toBe(50);
        });
    });

    // =============== PART 2 ===============

    describe(`Instance of transaction- .setBalance()`, () => {
        it(`should set transaction balance to be equal to account balance`, () => {

            testTransaction = new Transaction(2022, 05, 11, `CREDIT`, 50);
            testTransaction.setBalance(testAccount);
            expect(testTransaction.getBalance()).toEqual(testAccount.getBalance());
        });

        it(`should call acc.getBalance() once`, () => {

            balanceSpy = spyOn(testAccount, `getBalance`);

            testTransaction = new Transaction(2022, 05, 11, `CREDIT`, 50);
            testTransaction.setBalance(testAccount);
            expect(balanceSpy).toHaveBeenCalledTimes(1);
        });
    });
});