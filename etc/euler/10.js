import {BigNumber} from 'bignumber.js'
import {getPrimes} from './lib/sieve.js'

const solution = (n) => getPrimes(n).reduce((a, b) => a.plus(b), new BigNumber(0)).toFixed()


console.log(solution(2E6))