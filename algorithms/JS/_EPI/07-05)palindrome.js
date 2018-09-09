export function is_palindrome(s) {
    s = s.toLowerCase().replace(/[^a-z]/g, '')
    let i = 0
    let j = s.length - 1
    while (i <= j) {
        if (s[i++] !== s[j--]) {
            return false
        }
    }
    return true
}