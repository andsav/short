export function increment(n) {
    let carry
    n = n.reverse()
    n[0]++

    if (n[0] === 10) {
        n[0] = 0
        carry = true
    } else {
        return n.reverse()
    }

    for (let i = 1; i < n.length; ++i) {
        if (carry) {
            n[i]++
            if (n[i] === 10) {
                n[i] = 0
                carry = true
            } else {
                return n.reverse()
            }
        }
    }

    if (carry) {
        n.push(1)
    }

    return n.reverse()
}
