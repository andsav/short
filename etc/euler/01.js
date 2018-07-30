const solution = (n) => {
    let total = 0
    for (let i = 0; i < n; ++i) {
        if (i % 3 === 0 || i % 5 === 0) {
            total += i
        }
    }
    return total
}

console.log(solution(1000))
