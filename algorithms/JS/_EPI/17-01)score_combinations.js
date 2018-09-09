export function score_combinations(points, N) {
    let memo = Object.create(null)

    let dp = (i) => {
        if (i === 0) {
            return 1
        }
        if (i < 0) {
            return 0
        }

        if (!(i in memo)) {
            memo[i] = points.reduce((a, x) => a + dp(i - x), 0)
        }

        return memo[i]
    }

    dp(N)

    return dp(N)
}
