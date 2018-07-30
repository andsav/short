const solution = () => {
    Loop: for (let i = 4 * 3 * 5 * 7 * 11 * 13 * 17 * 19; ;i += 4) {
        for (let j = 2; j <= 20; ++j) {
            if (i % j !== 0) continue Loop
        }
        return i
    }
}

console.log(solution())
