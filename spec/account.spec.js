const Account = require("../src/account");

describe(`Account tests`, () => {

    let testAccount, typeSpy, amountSpy;

    const testTran1 = {
        date: `10 / 10 / 2022`,
        type: `credit`,
        amount: 500,

        getType() {
            return this.type;
        },

        getAmount() {
            return this.amount;
        }
    };

    const testTran2 = {
        date: `10 / 10 / 2022`,
        type: `debit`,
        amount: 200,

        getType() {
            return this.type;
        },

        getAmount() {
            return this.amount;
        }
    };

    beforeEach(() => {
        testAccount = new Account;
    });

    afterEach(() => {
        testAccount = null;
    });

    describe(`Account.getBalance()`, () => {
        it(`should return the balance`, () => {

            expect(testAccount.getBalance()).toEqual(0);
        });
    });

    describe(`Account.addTransaction()`, () => {
        it(`should increase transactions.length by one`, () => {

            testAccount.addTransaction(testTran1);

            expect(testAccount.getTransactions().length).toEqual(1);
        });

        it(`should contain the right object`, () => {

            testAccount.addTransaction(testTran1);

            expect(testAccount.getTransactions()).toContain(testTran1);
        });
    });

    // =============== PART 2 ===============

    describe(`Account.movement()`, () => {
        it(`should increase the account balance when it's credit`, () => {

            testAccount.movement(testTran1);

            expect(testAccount.getBalance()).toEqual(testTran1.getAmount());
        });

        it(`should decrease the account balance when it's debit`, () => {

            testAccount.movement(testTran1);
            testAccount.movement(testTran2);

            expect(testAccount.getBalance()).toBe(300);
        });

        it(`should throw an error if the debit amount is greater than the account balance`, () => {

            expect(testAccount.movement(testTran2)).toBeInstanceOf(Error);
        });

        it(`should not change account balance when the debit amount in greater`, () => {

            testAccount.movement(testTran2);

            expect(testAccount.getBalance()).toBe(0);
        });

        it(`should call transaction.getType()`, () => {

            typeSpy = spyOn(testTran1, `getType`);

            testAccount.movement(testTran1);
            expect(typeSpy).toHaveBeenCalled();
        });

        it(`should call transaction.getAmount()`, () => {

            amountSpy = spyOn(testTran1, `getAmount`);

            testAccount.movement(testTran1);
            expect(amountSpy).toHaveBeenCalled();
        });
    });
});