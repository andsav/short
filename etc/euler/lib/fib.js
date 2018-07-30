import {BigNumber} from "bignumber.js/bignumber"

const memo = {}
memo[0] = new BigNumber(1)
memo[1] = new BigNumber(1)

/**
 * ith Fibonacci number
 * @param i
 * @returns {*}
 */
export const fib = (i) => {
    if (!(i in memo)) {
        memo[i] = fib(i - 1).plus(fib(i - 2))
    }
    return memo[i]
}