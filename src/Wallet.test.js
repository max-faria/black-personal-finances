const Wallet = require("./Wallet")

describe('Wallet', () => {
    let wallet

    const mockIncome = {
        value: 5031,
        createdAt: new Date(),
        getValue: () => 50.31
    }

    beforeEach(() => {
        wallet = new Wallet()
    })


    it('should create an empty wallet with balance 0', () => {
        expect(wallet.balance).toBe(0)
    })

    it('should create an empty wallet with no transactions', () => {
        expect(wallet.transactions).toEqual([])
    })

    it('should save transaction on a wallet', () => {
        const mockTransaction = 'some transaction'
        wallet.addTransaction(mockTransaction)

        expect(wallet.transactions).toContain(mockTransaction)
    })

    it('should update the wallet balance when a transaction is saved', () => {
        const mockTransaction = {value:42}
        wallet.addTransaction(mockTransaction)

        expect(wallet.balance).toBe(42)
    })

    it('should get wallet balance as a number of up to two decimal places', () => {
        const mockTransaction = {value: 4219}
        wallet.addTransaction(mockTransaction)

        expect(wallet.getBalance()).toBe(42.19)
    })

    it('should get all the incomes', () => {
        const incomeB = {
            value: 8000,
            createdAt: new Date(),
            getValue: () => 80
        }

        wallet.addTransaction(mockIncome)
        wallet.addTransaction(mockIncome)

        const incomes = wallet.getAllIncomes()
        expect(incomes.total).toBe(100.62)
        expect(incomes.list).toContain(mockIncome)
    })

    it('should get all incomes and no expenses', () => {

        const incomeB = {
            value: -3500,
            createdAt: new Date(),
            getValue: () => -35
        }

        wallet.addTransaction(mockIncome)
        wallet.addTransaction(incomeB)

        const incomes = wallet.getAllIncomes()
        expect(incomes.total).toBe(50.31)
        expect(incomes.list).toContain(mockIncome)
        expect(incomes.list).not.toContain(incomeB)
    })

    it('should not include incomes created before start date', () => {
        const startDate = new Date('2022-01-01')
        const incomeBeforeStartDate = {
            value: 5031,
            createdAt: new Date(startDate.getTime() - 1),
            getValue: () => 50.31
        }
        const incomeAfterStartDate = {
            value: 8000,
            createdAt: new Date(startDate.getTime() + 1),
            getValue: () => 80
        }
        wallet.addTransaction(incomeAfterStartDate)
        wallet.addTransaction(incomeBeforeStartDate)

        const incomes = wallet.getAllIncomes(startDate)

        expect(incomes.total).toBe(80)
        expect(incomes.list).toContain(incomeAfterStartDate)
        expect(incomes.list).not.toContain(incomeBeforeStartDate)
    })

    it('should not include incomes created after end date', () => {
        const startDate = new Date('2022-01-01')
        const endDate = new Date('2022-01-31')
        const incomeBeforeEndDate = {
            value: 5031,
            createdAt: new Date(endDate.getTime() - 1),
            getValue: () => 50.31
        }
        const incomeAfterEndDate = {
            value: 8000,
            createdAt: new Date(endDate.getTime() + 1),
            getValue: () => 80
        }
        wallet.addTransaction(incomeBeforeEndDate)
        wallet.addTransaction(incomeAfterEndDate)

        const incomes = wallet.getAllIncomes(startDate, endDate)

        expect(incomes.total).toBe(50.31)
        expect(incomes.list).toContain(incomeBeforeEndDate)
        expect(incomes.list).not.toContain(incomeAfterEndDate)
    })

    it('should get all the expenses', () => {
        startDate = new Date()
        const expenseA = {
            value: -3500,
            createdAt: new Date(),
            getValue: () => -35
        }

        const expenseB = {
            value: -5000,
            createdAt: new Date(),
            getValue: () => -50
        }

        wallet.addTransaction(expenseA)
        wallet.addTransaction(expenseB)
        const expenses = wallet.getAllExpenses()

        expect(expenses.total).toBe(85)
        expect(expenses.list).toContain(expenseA)
        expect(expenses.list).toContain(expenseB)
    })


    it('should get all the expenses and no incomes', () => {
        startDate = new Date()
        const incomeA = {
            value: 3500,
            createdAt: new Date(),
            getValue: () => 35
        }

        const expenseB = {
            value: -5000,
            createdAt: new Date(),
            getValue: () => -50
        }

        wallet.addTransaction(incomeA)
        wallet.addTransaction(expenseB)
        const expenses = wallet.getAllExpenses()

        expect(expenses.total).toBe(50)
        expect(expenses.list).not.toContain(incomeA)
        expect(expenses.list).toContain(expenseB)
    })

    it('should not include expenses created after start date', () => {
        const startDate = new Date('2022-01-01')
        const endDate = new Date('2022-01-31')

        const expenseBeforeEndDate = {
            value: -5031,
            createdAt: new Date(startDate.getTime() + 1),
            getValue: () => -50.31
        }
        const expenseAfterEndDate = {
            value: -8000,
            createdAt: new Date(endDate.getTime() + 1),
            getValue: () => -80
        }
        wallet.addTransaction(expenseBeforeEndDate)
        wallet.addTransaction(expenseAfterEndDate)

        const expenses = wallet.getAllExpenses(startDate, endDate)

        expect(expenses.total).toBe(50.31)
        expect(expenses.list).toContain(expenseBeforeEndDate)
        expect(expenses.list).not.toContain(expenseAfterEndDate)
})

})