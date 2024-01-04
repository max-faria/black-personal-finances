const App = require("./App")

describe('App', () => {
    it('should create a new user', () => {
        const app = new App('Max')

        expect(app.user.name).toEqual('Max')
        expect(app.user.money).toBe(0)
        expect(app.user.wallets.length).toBe(0)
    })

})