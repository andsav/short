const solution = () => {
    let s = []
    let i = 0
    while (s.length < 1E6) {
        for (const c of ("" + (i++)).split('')) {
            s.push(parseInt(c, 10))
        }
    }
    return s[1] * s[10] * s[100] * s[1000] * s[10000] * s[100000]
}

console.log(solution())