import { Transaction } from './transaction';
import { Wallet } from '../wallet';

describe('Transaction', () => {
    let transaction: Transaction;
    let wallet: Wallet;
    let recipient: string;
    let amount: number;

    beforeEach(() => {
        wallet = new Wallet();
        recipient = 'rec1p13nt';
        amount = 50;
        transaction = Transaction.newTransaction(wallet, recipient, amount );
    });

    it('should output `amount` deducted from wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount);
    });

    it('should output `amount` added to recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount)
            .toEqual(amount);
    });

    describe('exceeding wallet balance', () => {

        beforeEach(() => {
            amount = 50000;
            transaction = Transaction.newTransaction(wallet, recipient, amount );
        });

        it('should not occur ', () => {
            expect(transaction).toEqual(undefined);
        });

    });

});

// it('', () => {});