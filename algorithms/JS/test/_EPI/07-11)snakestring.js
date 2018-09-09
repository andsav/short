import expect from "expect.js"
import {snakeString} from './../../_EPI/07-11)snakestring'

describe('snakeString()', function () {
    it('Hello World!', function () {
        expect(snakeString("Hello World!")).to.be("e lHloWrdlo!")
    })

})
