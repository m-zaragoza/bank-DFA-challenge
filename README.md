# Bank
## Instructions
To see the output of this programme, you need to run  `node bankRunner.js`  from the main project.

If you would like to run the tests, you need to run  `npm test`.  This will also print the statement.  

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
## Domain Model

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


According to my domain model, I should have 3 separate classes:
* Statement - in charge of formatting and printing the transactions.
* Account - responsible for performing and storing the transactions.
* Transaction - where we store the information of each movement. 


## Testing- Account part 1
```
For my first test, I want to check that a new instance of Account has a default balance of 0. I will use .toEqual().
Then I'll check that .addTransaction() adds an instance of transaction to transactions[] in account. I will create a mock transaction object with it's properties. We don't need the properties for these tests but may need them in the future. 
I will check that the array.length increases and that it contains the right object. I'll use .toEqual() and .toContain().
```
## Code- Account part 1
```
So far I've created the class Account that has 2 private properties: balance and transactions. Balance is set to 0 by default and transactions is an empty array. 
Because they are private properties, they have a getter each. Transactions also has a addTransaction() method that takes a transaction as argument and adds it to the transactions array using .push().
```
## Testing- Transaction part 1
```
Now that I know the basic functionality of account works, I will check that the class Transaction works as expected. 
I will test that I can use the Date built-in class as part of my constructor, using .toBeInstanceOf(). I will also check that getDate() throws an error if not declared correctly. 
For type, I will test that the programme transforms the input to lower case, which I think  will be necessary when I start working on the statement. I'll also check that getType() throws an error if it hasn't been declared. 
For amount, I will check that the programme throws an error if the input is less than or equal to 0.
```
## Code- Transaction part 1
```
I've created a Transaction class with date, amount, transaction and balance properties. It has a constructor that takes the date, amount and transaction types as arguments. 
The value of #date is an instance of Date using the constructor arguments, or of Error if the arguments are not declared as integers. I've used Number.isInteger() for this condition. 
The value of #type is the constructor argument in lower case (using .toLowerCase()), or an instance of Error if it's not declared. 
The value of #amount is the constructor's argument if it's higher than 0. If it's equal or lower than 0, it is an instance of Error. 
The value of balance is undefined for now.
Because all these properties are private, there is a getter for each of them. 
```
## Testing- Account part 2
```
For account.movement() I will test that the account balance increases when the transaction type is credit. I will check that the balance decreases when the type is debit and there is enough balance in the account to withdraw. Then I will check that the code throws an error when there is insufficient funds to withdraw the desired amount. In this case, I will also check that the balance doesn't change. 
Lastly I will check that .movement() calls transaction.getAmount() and transaction.getType(), using a spy. 
```
## Code- Account part 2
```
When it comes to updating the balance, I would have liked to make the method movement() loop through transactions[] and perform the operation on balance (account's and transaction's), depending on it being of type credit or debit. This would have made the execution of the code a lot simpler as I would only have to call account.movement() once, but I haven't been able to code it in a way that would set both account.balance and transaction.balance.

I've coded movement to take an instance of transaction as argument. First it checks if the transaction is of type debit and if the current balance is greater than or equal to the transaction amount, if that's the case the balance becomes balance taking away amount.
If transaction type is credit, balance becomes balance adding amount. 
Lastly it will throw an error, as the last option would be it being debit but with an amount greater than the current balance.
```
## Testing- Transaction part 2
```
Because I was unable to create a loop in account that would set the transaction balance, this functionality will be transaction's responsibility. 

I will check that .setBalance() sets the transaction's balance to that of the account. I will check that the amounts match and also that account.getBalance() has been called. I will need a mock account object and a spy.
```
## Code- Transaction part 2
```
In transaction class, I've created a setBalance() method that takes an account instance as an argument. This function sets this.#balance to be equal to the account's instance balance, by calling account.getBalance(). 
```
## Testing- Statement
```
For statement, I feel the best way of testing it without creating getters for the sole purpose of testing, is importing the bankRunner to statement.spec, so every time we run our tests we see the printed statement. Then it's just a matter of adjusting the format to match the criteria.
```
## Code- Statement
```
I have created a Statement class that takes an account instance as argument of its constructor. The class has two properties: movements and formattedStatement. In the constructor, we assign movements the value of the account instance's transactions, using getTransactions(). I decided to do it this way so it would be easier to handle and format the data in the array from Statement. 
.format() is a method that assigns to formattedStatement an array containing the transactions in movements, but already formatted and ready to print. To achieve this, I've used .map() on the original array and replaced each element in it with a string that contains the information we want to print. I've used concatenation to build the string. 

In this step I realised I made it a bit more complicated for myself by using the Date class, because it required quite a lot of formatting to get it to produce what's on the requirements (printing the date as day, month and year individually, and add a ternary so it prints a 0 before the single digit months).
For amount, I added a ternary to either print it or not print it, depending on it being of type credit or debit. 
To format amount and balance, I've used Number().toFixed(2). This ensures the statement prints the amounts with 2 decimals, even if they are declared as integers. 

.print() is a method that prints the heading of the statement first, and then loops through formattedStatement to print each of the transactions. To get it to print the transaction from newest to oldest, I made it so it loops in reverse. I didn't consider the idea of filtering through the dates to organise it as a real bank account would store the transactions as they happen, meaning they would be stored from oldest to newest(as I used .push() to store them).

To format the spacing, I tried using CSS rules on the console.log(), with %c, but I haven't been able to make it work. I ended up sorting it with spaces, but it doesn't seem to be a great solution. If, for example, we make a 2 digit transaction, the columns won't be aligned anymore. If I had been able to use CSS, I would have made it so each cell had a set width, which would be maintained regardless of the contents. 
```















# Bank

This challenge helps you practice your OO design skills.

You'll work alone, and you'll also review your own code so you can practice reflecting on and improving your own work.

## Specification

### Requirements

* You should be able to interact with your code via the JavaScript console.  (You don't need to implement a command line interface that takes input from STDIN.)
* Deposits, withdrawal.
* Account statement (date, credit or debit amount, balance) printing.
* Data can be kept in memory (it doesn't need to be stored to a database or anything).

### Acceptance criteria

**Given** a client makes a deposit of 1000 on 10-01-2012  
**And** a deposit of 2000 on 13-01-2012  
**And** a withdrawal of 500 on 14-01-2012  
**When** she prints her bank statement  
**Then** she would see

```
date       || credit  || debit  || balance
14/01/2012 ||         || 500.00 || 2500.00
13/01/2012 || 2000.00 ||        || 3000.00
10/01/2012 || 1000.00 ||        || 1000.00
```


#### Standard
- [ ] Meets the spec
- [ ] Developed test-first
- [ ] Passes tests and code is linted
- [ ] Encapsulates adding and storing Transactions in a class
- [ ] Encapsulates Statement formatting in a class
- [ ] Encapsulates Transaction data in a class

#### Extended
- [ ] See a coach!
