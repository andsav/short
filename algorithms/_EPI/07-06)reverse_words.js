const reverse_words = (s) => {
    s = s.split('')
    s.reverse()

    const swap = (i, j) => {
        let tmp = s[i]
        s[i] = s[j]
        s[j] = tmp
    }

    const reverse = (start, end) => {
        while (start <= end) {
            swap(start++, end--)
        }
    }

    let last = 0
    for (let i = 0; i < s.length; ++i) {
        if (s[i] === ' ') {
            reverse(last, i - 1)
            last = i + 1
        }
    }
    reverse(last, s.length - 1)

    return s.join('')
}

//console.log(reverse_words("Alice likes Bob"))