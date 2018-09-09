import expect from "expect.js"
import {increment} from './../../_EPI/06-02)increment'

describe('increment()', function () {
    it('123', function () {
        expect(increment([1, 2, 3])).to.eql([1, 2, 4])
    })
    it('9', function () {
        expect(increment([9])).to.eql([1, 0])
    })
    it('999', function () {
        expect(increment([9, 9, 9])).to.eql([1, 0, 0, 0])
    })
    it('8', function () {
        expect(increment([8])).to.eql([9])
    })
    it('18999', function() {
        expect(increment([1, 8, 9, 9])).to.eql([1, 9, 0, 0])
    })
})
