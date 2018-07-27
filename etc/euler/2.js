let fib = [];
fib[0] = 1;
fib[1] = 2;

let tot = 0;
for(let i=1; fib[i] < 4E6; ++i) {
    fib[i+1] = fib[i] + fib[i-1];
    if(fib[i]%2 === 0) {
        tot += fib[i];
    }
}

console.log(tot)
