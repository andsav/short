import expect from "expect.js"
import {solution} from './../../_Skiena/01-01)3n+1'

describe('3n+1', function () {
    it('1,10', function () {
        expect(solution(1,10)).to.be(20)
    })
    it('201,210', function () {
        expect(solution(201, 210)).to.be(89)
    })
    it('900,1000', function () {
        expect(solution(900,1000)).to.be(174)
    })
    it('1,1000', function () {
        expect(solution(1,1000)).to.be(179)
    })
})
