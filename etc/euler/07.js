import {getPrimes} from './lib/sieve.js'

const solution = function(n) {
    return getPrimes(1E6, n)[n-1]
}

console.log(solution(10001))