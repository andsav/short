const solution = function (n) {
    for (let a = 1; a <= n; ++a) {
        for (let b = a; b <= n; ++b) {
            if (a + b + Math.sqrt((a * a + b * b)) === 1000) {
                return a * b * Math.sqrt((a * a + b * b))
            }
        }
    }
}

console.log(solution(1000))