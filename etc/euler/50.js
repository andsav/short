import {isPrime, getPrimes} from './lib/sieve.js'

const solution = (n) => {
    let primes = getPrimes(n)

    let tail
    let head = 0
    let total = 0

    for (tail = 0; tail < primes.length; ++tail) {
        while (head < primes.length && total + primes[head] < n) {
            total += primes[head]
            head++
        }
        if (isPrime(total)) {
            return total
        }
        total -= primes[tail]
    }
}

console.log(solution(1E6))