var ACCOUNT_VALIDITY_DAYS = 365;
var DebitAccount = /** @class */ (function () {
    function DebitAccount(name, balance) {
        if (balance === void 0) { balance = 0; }
        this.name = name;
        this.dateCreated = new Date();
        this.dateValid = new Date(this.dateCreated.getTime() + ACCOUNT_VALIDITY_DAYS * 24 * 60 * 60 * 1000);
        this.balance = balance;
    }
    DebitAccount.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    DebitAccount.prototype.withdraw = function (amount) {
        if (this.balance - amount < 0) {
            throw new Error("Insufficient balance");
        }
        this.balance -= amount;
    };
    DebitAccount.prototype.checkBalance = function () {
        console.log("Balance: ".concat(this.balance));
    };
    return DebitAccount;
}());
var CreditAccount = /** @class */ (function () {
    function CreditAccount(name, balance, credit) {
        if (balance === void 0) { balance = 0; }
        if (credit === void 0) { credit = 0; }
        this.name = name;
        this.dateCreated = new Date();
        this.dateValid = new Date(this.dateCreated.getTime() + ACCOUNT_VALIDITY_DAYS * 24 * 60 * 60 * 1000);
        this.balance = balance;
        this.credit = credit;
    }
    CreditAccount.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    CreditAccount.prototype.withdraw = function (amount) {
        if (this.balance - amount < 0) {
            throw new Error("Insufficient balance");
        }
        this.balance -= amount;
    };
    CreditAccount.prototype.checkBalance = function () {
        console.log("Balance: ".concat(this.balance));
    };
    CreditAccount.prototype.payCredit = function (amount) {
        if (this.credit - amount < 0) {
            throw new Error("Credit is negative");
        }
        this.credit -= amount;
    };
    CreditAccount.prototype.checkCredit = function () {
        console.log("Credit: ".concat(this.credit));
    };
    return CreditAccount;
}());
var debitAccount = new DebitAccount("Debit Account", 1000);
var creditAccount = new CreditAccount("Credit Account", 1000, 1000);
console.log("Checking initial balances:");
debitAccount.checkBalance();
creditAccount.checkBalance();
console.log("Depositing 500 to both accounts:");
debitAccount.deposit(500);
creditAccount.deposit(500);
console.log("Checking balances after deposits:");
debitAccount.checkBalance();
creditAccount.checkBalance();
console.log("Withdrawing 200 from both accounts:");
debitAccount.withdraw(200);
creditAccount.withdraw(200);
console.log("Checking balances after withdrawals:");
debitAccount.checkBalance();
creditAccount.checkBalance();
console.log("Checking credit:");
creditAccount.checkCredit();
console.log("Paying 500 towards credit:");
creditAccount.payCredit(500);
creditAccount.checkCredit();
console.log("Attempting to withdraw 1500 from credit account:");
try {
    creditAccount.withdraw(1500);
}
catch (error) {
    console.error(error);
}
creditAccount.checkBalance();
creditAccount.checkCredit();
console.log("Final balance check:");
debitAccount.checkBalance();
creditAccount.checkBalance();
console.log("Final credit check:");
creditAccount.checkCredit();
