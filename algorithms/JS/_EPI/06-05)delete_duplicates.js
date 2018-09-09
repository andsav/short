export function delete_duplicates(arr) {
    if (arr.length <= 1) return arr

    let n = arr.length
    let first_vacant = -1

    for (let i = 1; i < n; ++i) {
        if (first_vacant !== -1) {
            [arr[i], arr[first_vacant]] = [arr[first_vacant], arr[i]]
            first_vacant = arr[i] === arr[first_vacant + 1] ? first_vacant + 1 : -1
        } else if (arr[i] === arr[i - 1]) {
            first_vacant = i
            while (arr[i + 1] === arr[i]) {
                i++
            }
        }
    }

    return arr.slice(0, n)
}
