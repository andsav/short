import {getPrimes, isPrime} from './lib/sieve.js'

const solution = () => {
    const plist = getPrimes(30000)
    let valid = {}
    for (let i = 0; i < plist.length; ++i) {
        for (let j = i; j < plist.length; ++j) {
            if (isPrime(parseInt(plist[i] + "" + plist[j], 10)) && isPrime(parseInt(plist[j] + "" + plist[i], 10))) {
                if (!(plist[i] in valid))
                    valid[plist[i]] = []
                if (!(plist[j] in valid))
                    valid[plist[j]] = []

                valid[plist[i]].push(plist[j])
                valid[plist[j]].push(plist[i])
            }
        }
    }

    let min = Infinity
    for (let p of Object.keys(valid)) {
        let s = []
        let visited = {}
        let level = {}
        let parent = {}

        s.push(p)

        level[p] = 1
        visited[p] = true
        parent[p] = 0

        while (s.length !== 0) {
            let u = s.pop()
            for (let v of valid[u]) {
                if (!(v in visited)) {
                    visited[v] = true
                    level[v] = level[u] + 1
                    parent[v] = u
                    if (level[v] >= 5) {
                        let w = v
                        let sum = 0
                        for (let i = 0; i < 5; ++i) {
                            sum += w
                            w = parent[w]
                        }
                        min = Math.min(min, sum)
                    }
                }
            }
        }
    }
    return min
}

console.log(solution())