const Transaction = require("./Transaction")

describe('Transaction class', () => {
    it('should not be able to creat a transaction with no string label', () => {
        expect(() => new Transaction(1,42)).toThrow('label must be of type string')
    })

    it('should not be able to creat a transaction with non number value', () => {
        expect(() => new Transaction('some transaction','42')).toThrow('value must be of type number')
    })

    it('should not be able to create a transaction with more than two decimal places', () => {
        expect(() => new Transaction('some transaction', 3.1456)).toThrow('value must have up to two decimal places')
        expect(() => new Transaction('some transaction', 3.14)).not.toThrow('value must have up to two decimal places')
    })

    it('should save the number as a integer', () => {
        const transaction = new Transaction('some transaction', 1.12)

        expect(transaction.value).toBe(112)
    })

    it('should be able to get the value as a float', () => {
        const transaction = new Transaction('some transaction', 3.14)
        expect(transaction.getValue()).toBe(3.14)
    })
})