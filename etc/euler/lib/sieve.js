const BigNum = require('bignum')

const not_prime = {1: true}
const primes = {}
let map_max = 0

/**
 * Get primes lower than n with Sieve, return a maximum of max primes
 *
 * @param n
 * @param max
 * @returns {Array}
 */
export const getPrimes = function (n, max = Infinity) {
    const primes = []

    for (let i = 2; i < n && primes.length < max; ++i) {
        if (!(i in not_prime)) {
            primes.push(i)
            for (let j = 2; i * j < n; ++j) {
                not_prime[i * j] = true
            }
        }
    }

    return primes
}

/**
 *
 * @param n
 * @returns {{}}
 */
export const getPrimesMap = function (n) {
    if (n <= map_max) {
        return primes
    }

    let plist = getPrimes(n)
    plist.forEach(p => {
        primes[p] = true
    })
    map_max = plist[plist.length - 1]

    return primes
}

/**
 *
 * @param n
 * @returns {boolean}
 */
export const isPrime = function (n) {
    return n <= 1E6 ? (n in getPrimesMap(n + 1)) : BigNum(n).probPrime() === true
}