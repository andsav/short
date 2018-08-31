/*
    Constant space
 */
const partition = (A, pivot) => {
    let swap = (i, j) => {
        let tmp = A[i]
        A[i] = A[j]
        A[j] = tmp
    }

    let j = 0
    for (let i = 0; i < A.length; ++i) {
        if (A[i] < pivot) {
            swap(i, j++)
        }
    }

    j = A.length - 1
    for (let i = A.length - 1; i >= 0; --i) {
        if (A[i] > pivot) {
            swap(i, j--)
        }
    }

    return A
}
