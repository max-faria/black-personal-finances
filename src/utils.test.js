const { isValidDecimal } = require("./utils")

describe('utils.js', () => {
    it('sould return true if number is an integer', () => {
        expect(isValidDecimal(42)).toBe(true)
    })

    it('should return true if number has one decimal place', () => {
        expect(isValidDecimal(6.2)).toBe(true)
    })

    it('should return true if number has two decimal places', () => {
        expect(isValidDecimal(3.14)).toBe(true)
    })

    it('should return false if number more than two decimal places', () => {
        expect(isValidDecimal(3.456)).toBe(false)
    })

})