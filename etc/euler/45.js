const solution = (x) => {

    function* triangular() {
        for (let n = 1; ; ++n) {
            yield n * (n + 1) / 2
        }
    }

    function* pentagonal() {
        for (let n = 1; ; ++n) {
            yield n * (3 * n - 1) / 2
        }
    }

    function* hexagonal() {
        for (let n = 1; ; ++n) {
            yield n * (2 * n - 1)
        }
    }

    let t = 0, p = 0, h = 0
    do {
        let min = Math.min(t, p, h);
        if(t === min) {
            t = triangular()
        } else if(h === min) {
            h = hexagonal()
        } else {
            p = pentagonal()
        }
    } while (t !== p && p !== h && x < t)


}

console.log(solution(40754))