# Bank
## About this project
This academy project is aimed to help us practice out Object Oriented Design.\
It is to be developed following TDD and practicing encapsulation. 
</br></br>

## Built with
Java Script, and using Jasmine as testing framework. 
</br></br>

## Getting started
- Clone this project to your local machine. 
- Run this command to install all the dependencies:
```
npm install
```
- By running this command, you see the test results and the program's output:
```
npm test
```
- To see only the program's output, run this command:
```
node bankRunner.js
```
</br>

## Problem statement
```
As an account holder,
so that I can check my account movements(deposits and withdrawals),
I want to be able to print a statement that looks like this:
```
```
date       || credit  || debit  || balance
14/01/2012 ||         || 500.00 || 2500.00
13/01/2012 || 2000.00 ||        || 3000.00
10/01/2012 || 1000.00 ||        || 1000.00
```
### Domain Model

| Object | Message |
| ------ | ------- |
| Statement | print() |
| Account | addTransaction() |
|         | movement() |
| Transaction |         |

| Object      | Property           | Message          | Output |
| ------      | --------           | -------          | ------ |
| Statement   | formattedStatement | print()          | @string |
|             | movements          | format()         |         |
| Account     | transactions       | addTransaction() |         |
|             |                    | getTransactions()| @array  |
|             | balance            | movement()       |         |
|             |                    | getBalance()     | @number |
| Transaction | type               | getType()        | @string |
|             | date               | getDate()        | @string |
|             | amount             | getAmount()      | @number |
|             | balance            | getBalance()     | @number |
|             |                    | setBalance()     |         |

### Testing- Account part 1

For my first test, I want to check that a new instance of Account has a default balance of 0. I will use .toEqual().
Then I'll check that .addTransaction() adds an instance of transaction to transactions[] in account. I will create a mock transaction object with it's properties. We don't need the properties for these tests but may need them in the future. 
I will check that the array.length increases and that it contains the right object. I'll use .toEqual() and .toContain().

### Testing- Transaction part 1

Now that I know the basic functionality of account works, I will check that the class Transaction works as expected. 
I will test that I can use the Date built-in class as part of my constructor, using .toBeInstanceOf(). I will also check that getDate() throws an error if not declared correctly. 
For type, I will test that the programme transforms the input to lower case, which I think  will be necessary when I start working on the statement. I'll also check that getType() throws an error if it hasn't been declared. 
For amount, I will check that the programme throws an error if the input is less than or equal to 0.

### Testing- Account part 2

For account.movement() I will test that the account balance increases when the transaction type is credit. I will check that the balance decreases when the type is debit and there is enough balance in the account to withdraw. Then I will check that the code throws an error when there is insufficient funds to withdraw the desired amount. In this case, I will also check that the balance doesn't change. 
Lastly I will check that .movement() calls transaction.getAmount() and transaction.getType(), using a spy. 

### Testing- Transaction part 2

Because I was unable to create a loop in account that would set the transaction balance, this functionality will be transaction's responsibility. 

I will check that .setBalance() sets the transaction's balance to that of the account. I will check that the amounts match and also that account.getBalance() has been called. I will need a mock account object and a spy.

### Testing- Statement

For statement, I feel the best way of testing it without creating getters for the sole purpose of testing, is importing the bankRunner to statement.spec, so every time we run our tests we see the printed statement. Then it's just a matter of adjusting the format to match the criteria.
</br></br>

## Review
If I were to do this challenge again today, I would change a few things:
- The movement() method could benefit from if-else statement instead of ternary, as these are chained and make it more difficult to read. 
- The format() method is quite convoluted. I would create a formatLine() method to take care of the formatting of each transaction, and then call it from format(). That would make it a lot cleaner. 
- I would make a smart use of calling methods within other methods, so my bankRunner would be a lot more elegant.

