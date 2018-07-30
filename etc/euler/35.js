import {isPrime, getPrimes} from './lib/sieve.js'

const solution = (n) => {
    return getPrimes(n).reduce((carry, p) => {
        if (p < 10) {
            return carry + 1
        }
        let a = ("" + p).split('')
        for (let i = 0; i < a.length; ++i) {
            a.unshift(a.pop())
            if (!isPrime(parseInt(a.join(''), 10))) {
                return carry
            }
        }
        return carry + 1
    }, 0)
}

console.log(solution(1E6))