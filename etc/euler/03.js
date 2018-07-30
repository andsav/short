const solution = () => {
    let seen = []
    for (let i = 3; i < Math.sqrt(600851475143); i += 2) {
        if (600851475143 % i === 0) {
            let prime = true
            for (let x of seen) {
                if (i % x === 0) {
                    prime = false
                    break
                }
            }
            if (prime) {
                seen.push(i)
            }
        }
    }
    return seen[seen.length - 1]
}

console.log(solution())
