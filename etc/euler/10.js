import {BigNumber} from 'bignumber.js'

const solution = (n) => {
    const not_prime = {1: true}
    const primes = []

    for (let i = 2; i < n; ++i) {
        if(!(i in not_prime)) {
            primes.push(i)
            for (let j = 2; i*j < n; ++j) {
                not_prime[i*j] = true;
            }
        }
    }

    return primes.reduce((a, b) => a.plus(b), new BigNumber(0)).toFixed()
}


console.log(solution(2E6))