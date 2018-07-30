import {BigNumber} from 'bignumber.js'

const solution = function (i) {
    let fac = (n) => n.isEqualTo(1) ? 1 : n.multipliedBy(fac(n.minus(1)))

    return fac(new BigNumber(100))
        .toFixed()
        .split('')
        .map(x => parseInt(x, 10))
        .reduce((a, b) => a + b, 0)
}

console.log(solution(100))