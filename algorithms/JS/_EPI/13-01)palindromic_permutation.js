export function canBePalindromic(str) {
    let count = Object.create(null)
    str.split('').forEach(s => {
        if (!(s in count)) {
            count[s] = 0
        }
        count[s]++
    })
    return Object.values(count).filter(x => x % 2 !== 0).length <= 1
}