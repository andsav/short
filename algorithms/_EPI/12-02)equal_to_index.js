function equal_to_index(arr) {
    let left = 0
    let right = arr.length - 1

    while (left <= right) {
        let mid = (left + right) >> 1
        if (mid === arr[mid]) {
            return mid
        } else if (mid < arr[mid]) {
            left = mid - 1
        } else {
            left = mid + 1
        }
    }


    return -1
}

//console.log(equal_to_index([-1, 0, 0, 2, 2, 3, 6]))