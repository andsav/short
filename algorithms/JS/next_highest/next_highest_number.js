const next_higher = (A) => {
    const swap = (i, j) => {
        [A[i], A[j]] = [A[j], A[i]]
    }

    const reverse = (start, end) => {
        while (start <= end) {
            swap(start++, end--)
        }
    }

    let a = -1
    let b
    for (let i = A.length - 2; i >= 0; --i) {
        if (A[i] < A[i + 1]) {
            a = i
            break
        }
    }

    if (!~a) {
        return A.sort((a, b) => a - b)
    }

    let min = Infinity
    for (let i = a + 1; i < A.length; ++i) {
        if (A[i] > A[a] && A[i] < min) {
            min = A[i]
            b = i
        }
    }

    swap(a, b)
    reverse(a + 1, A.length - 1)

    return A
}

const prev_lower = (A) => {
    // TODO

    return
}

console.log(
    prev_lower(next_higher([1, 2, 3, 5, 4, 2]))
)