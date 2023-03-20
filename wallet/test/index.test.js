const Wallet = require('../index')
const TransactionPool = require('../transaction-pool')
const Blockchain = require('../../block_chain/blockchain')

describe('Wallet', () => {
    let wallet, tp, bc;

    beforeEach(() => {
        wallet = new Wallet()
        tp = new TransactionPool()
        bc = new Blockchain()
    })

    describe('creating a transaction', () => {
        let transaction, sendAmount, recipient

        beforeEach(() => {
            sendAmount = 50
            recipient = 'codecove'
            transaction = wallet.createTransaction(recipient, sendAmount, bc, tp)
        })

        describe('another transaction', () => {
            beforeEach(() => {
                wallet.createTransaction(recipient, sendAmount, bc, tp)
            })

            it('doubles the `sendAmount` that is subtracted from the wallet balance', () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - sendAmount * 2)
            })

            it('clones the `sendAmount` output for the recipient', () => {
                expect(transaction.outputs.filter(output => output.address === recipient).map(output => output.amount)).toEqual([sendAmount, sendAmount])
            })
        })
    })
})