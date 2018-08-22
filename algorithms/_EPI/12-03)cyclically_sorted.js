function search(arr, k) {
    let pivot = (() => {
        let left = 0
        let right = arr.length - 1

        while (left < right) {
            let mid = (left + right) >> 1
            if (mid === 0 || mid === arr.length - 1) {
                return mid
            }

            if (arr[mid] > arr[right]) {
                left = mid + 1
            } else {
                right = mid
            }
        }

        return left
    })()

    let left = 0
    let right = arr.length - 1

    while (left <= right) {
        let mid = (left + right) >> 1
        if (arr[(mid + pivot) % arr.length] === k) {
            return (mid + pivot) % arr.length
        } else if (arr[(mid + pivot) % arr.length] < k) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    return -1
}

console.log(
    search([378, 478, 550, 631, -52, 103, 104, 201, 299, 370], 378)
)