const ACCOUNT_VALIDITY_DAYS = 365;

interface Account {
    name: string;
    dateCreated: Date;
    dateValid: Date;
    balance: number;

    deposit(amount: number): void;
    withdraw(amount: number): void;
    checkBalance(): void;
}

interface CreditAccount extends Account {
    credit: number;

    payCredit(amount: number): void;
    checkCredit(): void;
}

class DebitAccount implements Account {
    name: string;
    dateCreated: Date;
    dateValid: Date;
    balance: number;

    constructor(name: string, balance = 0) {
        this.name = name;
        this.dateCreated = new Date();
        this.dateValid = new Date(this.dateCreated.getTime() + ACCOUNT_VALIDITY_DAYS * 24 * 60 * 60 * 1000);
        this.balance = balance;
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (this.balance - amount < 0) {
            throw new Error("Insufficient balance");
        }
        this.balance -= amount;
    }

    checkBalance(): void {
        console.log(`Balance: ${this.balance}`);
    }
}

class CreditAccount implements CreditAccount {
    name: string;
    dateCreated: Date;
    dateValid: Date;
    balance: number;
    credit: number;

    constructor(name: string, balance = 0, credit = 0) {
        this.name = name;
        this.dateCreated = new Date();
        this.dateValid = new Date(this.dateCreated.getTime() + ACCOUNT_VALIDITY_DAYS * 24 * 60 * 60 * 1000);
        this.balance = balance;
        this.credit = credit;
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (this.balance - amount < 0) {
            throw new Error("Insufficient balance");
        }
        this.balance -= amount;
    }

    checkBalance(): void {
        console.log(`Balance: ${this.balance}`);
    }

    payCredit(amount: number): void {
        if (this.credit - amount < 0) {
            throw new Error("Credit is negative");
        }
        this.credit -= amount;
    }

    checkCredit(): void {
        console.log(`Credit: ${this.credit}`);
    }
}

const debitAccount = new DebitAccount("Debit Account", 1000);
const creditAccount = new CreditAccount("Credit Account", 1000, 1000);

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
} catch (error) {
    console.error(error);
}
creditAccount.checkBalance();
creditAccount.checkCredit();

console.log("Final balance check:");
debitAccount.checkBalance();
creditAccount.checkBalance();

console.log("Final credit check:");
creditAccount.checkCredit();
