const solution = (n) => {
    let fib = []
    fib[0] = 1
    fib[1] = 2

    let tot = 0
    for (let i = 1; fib[i] < n; ++i) {
        fib[i + 1] = fib[i] + fib[i - 1]
        if (fib[i] % 2 === 0) {
            tot += fib[i]
        }
    }

    return tot
}

console.log(solution(4E6))
