export function snakeString(str) {
    let ret = ""
    for (let i = 1; i < str.length; i += 4) {
        ret += str[i]
    }
    for (let i = 0; i < str.length; i += 2) {
        ret += str[i]
    }
    for (let i = 3; i < str.length; i += 4) {
        ret += str[i]
    }
    return ret
}