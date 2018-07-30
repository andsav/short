import {BigNumber} from 'bignumber.js'

const solution = (d) => {
    let fib = {}
    fib[0] = new BigNumber(1)
    fib[1] = new BigNumber(1)

    let dp = (i) => {
        if (!(i in fib)) {
            fib[i] = dp(i - 1).plus(dp(i - 2))
        }
        return fib[i]
    }

    let i
    for (i = new BigNumber(12); dp(i).toFixed().length < d; ++i);
    return i+1
}

console.log(solution(1000))