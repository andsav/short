const spiral = (A) => {
    if (A.length === 0)
        return []

    let [top, right, bottom, left] = [0, A[0].length - 1, A.length - 1, 0]
    let ret = []

    let add = (dir) => {
        if (bottom < top || right < left)
            return

        switch (dir) {
            case 'lr':
                for (let [i, j] = [top, left]; j <= right; ++j) {
                    ret.push(A[i][j])
                }
                top++
                add('tb')
                break
            case 'tb':
                for (let [i, j] = [top, right]; i <= bottom; ++i) {
                    ret.push(A[i][j])
                }
                right--
                add('rl')
                break
            case 'rl':
                for (let [i, j] = [bottom, right]; j >= left; --j) {
                    ret.push(A[i][j])
                }
                bottom--
                add('bt')
                break
            case 'bt':
                for (let [i, j] = [bottom, left]; i >= top; --i) {
                    ret.push(A[i][j])
                }
                left++
                add('lr')
                break
        }
    }

    add('lr')

    return ret
}

/*
let A = [[1, 2, 3, 4], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]
console.log(spiral(A))

A = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
console.log(spiral(A))
*/