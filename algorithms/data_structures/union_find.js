export class UF {
    constructor(n) {
        this.parents = Array(n).fill(0).map((_, i) => i)
        this.count = n
    }

    find(i) {
        if (this.parents[i] === i) {
            return i
        }
        this.parents[i] = this.find(this.parents[i])
        return this.parents[i]
    }

    union(i, j) {
        let a = this.find(i)
        let b = this.find(j)

        if (a !== b) {
            this.parents[a] = b
            this.count--
        }
    }
}