function first_occurrence(arr, k) {
    let left = 0
    let right = arr.length - 1

    while (left <= right) {
        let mid = (left + right) >> 1
        if (arr[mid] === k) {
            while (mid >= 0 && arr[mid] === k) {
                mid--
            }
            return mid + 1
        } else if (arr[mid] < k) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    return -1
}

function first_greater(arr, k) {
    let left = 0
    let right = arr.length - 1

    let res = -1
    while (left <= right) {
        let mid = (left + right) >> 1
        if (arr[mid] === k) {
            while (mid < arr.length && arr[mid] === k) {
                mid++
            }
            return mid < arr.length ? arr[mid] : -1
        } else if (arr[mid] < k) {

            left = mid + 1
        } else {
            res = arr[mid]
            right = mid - 1
        }
    }

    return res
}