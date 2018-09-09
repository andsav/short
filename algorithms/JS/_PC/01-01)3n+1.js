let memo = {}

function cycleLength(n) {
    if (!(n in memo)) {
        let count = 1
        while (n !== 1) {
            if (n % 2 === 0) {
                n /= 2
            } else {
                n = n * 3 + 1
            }
            count++
        }
        memo[n] = count
    }
    return memo[n]
}

export function solution(i, j) {
    let max = 0
    for (; i <= j; ++i) {
        max = Math.max(max, cycleLength(i))
    }
    return max
}