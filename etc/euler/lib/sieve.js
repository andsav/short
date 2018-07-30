/**
 * Get primes lower than n with Sieve
 * @param n
 * @returns {Array}
 */
export const getPrimes = function (n) {
    const not_prime = {1: true}
    const primes = []

    for (let i = 2; i < n; ++i) {
        if (!(i in not_prime)) {
            primes.push(i)
            for (let j = 2; i * j < n; ++j) {
                not_prime[i * j] = true
            }
        }
    }

    return primes
}