/**
 * Supports '.' and '*'
 *
 * @param text
 * @param pattern
 * @returns {*}
 */
function isMatch(text, pattern) {
    if (text.length === 0 && pattern.length === 0) {
        return true
    }

    if (text.length === 0 || pattern.length === 0) {
        if (pattern[1] === '*') {
            return isMatch('', pattern.slice(2))
        }
        return false
    }

    if (pattern[0] === '.') {
        if (pattern[1] === '*') {
            for (let i = 1; i < text.length; ++i) {
                if (isMatch(text.slice(i + 1), pattern.slice(2))) {
                    return true
                }
            }
            return false
        } else return isMatch(text.slice(1), pattern.slice(1))
    } else {
        if (pattern[1] === '*') {
            for (let i = 0; text[i] === pattern[0]; ++i) {
                if (isMatch(text.slice(i + 1), pattern.slice(2))) {
                    return true
                }
            }
            return isMatch(text, pattern.slice(2)) //
        } else {
            return pattern[0] === text[0] && isMatch(text.slice(1), pattern.slice(1))
        }
    }
}

console.log(isMatch("abaa", "a.*a*"))
console.log(isMatch("abaaaaaa", "a.*c"))