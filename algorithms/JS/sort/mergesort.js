export const mergeSort = function (A) {
    if (A.length <= 1) {
        return A
    }

    return merge(
        mergeSort(A.slice(0, Math.floor(A.length / 2))),
        mergeSort(A.slice(Math.floor(A.length / 2), A.length))
    )
}

const merge = function (A, B) {
    let ret = []
    let a = 0
    let b = 0

    while (a < A.length || b < B.length) {
        if (b === B.length || A[a] < B[b]) {
            ret.push(A[a])
            a++
        } else {
            ret.push(B[b])
            b++
        }
    }

    return ret
}