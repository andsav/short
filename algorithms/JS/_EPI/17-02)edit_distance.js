export function distance(str1, str2) {
    let A = str1.split('')
    let B = str2.split('')

    let memo = {}
    let dp = (i, j) => {
        if (i >= A.length || j >= B.length) {
            return Infinity
        }

        if (i === A.length - 1 && j === B.length - 1) {
            return 0
        }

        if (!(i in memo)) {
            memo[i] = {}
        }

        if (!(j in memo[i])) {
            memo[i][j] = Math.min(
                (A[i] === B[j] ? 0 : 1) + dp(i + 1, j + 1),
                1 + dp(i + 1, j),
                1 + dp(i, j + 1)
            )
        }

        return memo[i][j]
    }

    return dp(0, 0)
}