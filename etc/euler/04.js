const solution = function () {
    let ans = 0

    for (let i = 999; i >= 100; --i) {
        for (let j = 999; j >= 100; --j) {
            let prod = i * j
            if (parseInt(("" + (i * j)).split('').reverse().join(''), 10) === prod) {
                ans = Math.max(prod, ans)
            }
        }
    }

    return ans
}

console.log(solution())
