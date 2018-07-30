const solution = () => {
    let sum = 0

    const upper = Math.pow(9, 5) * 5
    for (let i = 2; i < upper; ++i) {
        if (i === ("" + i)
                .split('')
                .map(x => parseInt(x, 10))
                .reduce((a, b) => a + Math.pow(b, 5), 0)) {
            sum += i
        }
    }
    return sum
}

console.log(solution())