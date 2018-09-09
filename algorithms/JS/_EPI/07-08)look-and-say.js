export function lookandsay(n) {
    let memo = Array(n + 1).fill(false)
    memo[1] = "1"

    let rec = (i) => {
        if (!memo[i]) {
            let prev = rec(i - 1)
            let ret = []

            let count = 1
            for (let i = 1; i < prev.length; ++i) {
                if (prev[i] === prev[i - 1]) {
                    count++
                } else {
                    ret.push(String(count) + prev[i - 1])
                    count = 1
                }
            }
            ret.push(String(count) + prev[prev.length - 1])

            memo[i] = ret.join('')
        }
        return memo[i]
    }

    return rec(n)
}
