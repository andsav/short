import {fib} from './lib/fib.js'

const solution = (d) => {
    for (var i = 12; fib(i).toFixed().length < d; ++i);

    return i + 1
}

console.log(solution(1000))