export function permutations(arr) {
    let ret = []

    let permute = (A, rest) => {
        if (A.length === 0) {
            ret.push(rest)
            return
        }

        for (let i = 0; i < A.length; ++i) {
            permute(A.slice(0, i).concat(A.slice(i + 1)), rest.concat([A[i]]))
        }
    }

    permute(arr, [])

    return ret
}
