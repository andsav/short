export function merge(A, B) {
    let right = A.length - 1
    let n = A.length - B.length - 1

    while (B.length >= 0 && right >= n && n >= 0) {
        if (B[B.length - 1] > A[n]) {
            A[right--] = B.pop()
        } else {
            [A[n--], A[right--]] = [A[right], A[n]]
        }
    }

    while (right >= 0 && B.length >= 0) {
        A[right--] = B.pop()
    }

    for (let i = 1; i < A.length; ++i) {
        if (A[i - 1] > A[i]) {
            [A[i], A[i - 1]] = [A[i - 1], A[i]]
        }
    }

    return A
}
