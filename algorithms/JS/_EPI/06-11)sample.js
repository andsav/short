function sample(A, k) {
    let swap = (i, j) => {
        let tmp = A[i]
        A[i] = A[j]
        A[j] = tmp
    }

    for (let i = 0; i < A.length; ++i) {
        let j = Math.floor(Math.random() * (A.length - 1 - i)) - i
        swap(i, j)
    }

    return A.slice(0, k)
}