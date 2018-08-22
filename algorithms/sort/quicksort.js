export const shuffle = function (A) {
    const rand = i => i + Math.floor(Math.random() * (A.length - 1 - i))

    const swap = function (i, j) {
        let tmp = A[i]
        A[i] = A[j]
        A[j] = tmp
    }

    for (let i = 0; i < A.length; ++i) {
        swap(i, rand(i))
    }
}

export const quickSort = function (arr) {
    shuffle(arr)

    const qs = function (A) {
        if (A.length <= 1) {
            return A
        }

        let pivot = A.pop()
        let left = []
        let right = []

        A.forEach(x => {
            if (x <= pivot) {
                left.push(x)
            } else {
                right.push(x)
            }
        })
        return qs(left).concat([pivot]).concat(qs(right))
    }

    return qs(arr)
}

console.log(quickSort([4, -2, 3, 99, 100, 232, 1, 5, 7, -5, -3, -4]))