class Heap {
    constructor(scoreFn = (x) => x) {
        this._scoreFn = scoreFn
        this._array = []
    }

    get array() {
        return this._array
    }

    peek() {
        return this._array[0]
    }

    push(x) {
        this._array.push(x)
        this._bubbleUp()
    }

    pop() {
        let first = this._array[0]
        let last = this._array.pop()

        if (this._array.length !== 0) {
            this._array[0] = last
            this._bubbleDown()
        }

        return first
    }

    getSorted() {
        let sorted = []
        while (this._array.length !== 0) {
            sorted.push(this.pop())
        }
        return sorted
    }

    static heapify(a, scoreFn = (x) => x) {
        let h = new Heap(scoreFn)
        a.forEach(x => {
            h.push(x)
        })
        return h
    }

    _bubbleDown(n = 0) {
        let children = [(n + 1) * 2, (n + 1) * 2 - 1]

        let x = this._array[n]
        let swap = null
        let score = this._scoreFn(x)

        children.filter(c => c < this._array.length).forEach(child => {
            let childScore = this._scoreFn(this._array[child])
            if (childScore < score) {
                score = childScore
                swap = child
            }
        })

        if (!swap) return


        this._array[n] = this._array[swap]
        this._array[swap] = x
        this._bubbleDown(swap)
    }

    _bubbleUp(n = this._array.length - 1) {
        if (n === 0) return

        let x = this._array[n]
        let parentN = Math.floor((n + 1) / 2) - 1
        let parent = this._array[parentN]

        if (this._scoreFn(x) >= this._scoreFn(parent)) return

        // Swap
        this._array[parentN] = x
        this._array[n] = parent

        this._bubbleUp(parentN)
    }
}

let a = Heap.heapify([8, 1, 4, 7, 3, 2])
console.log(a.array)
console.log(a.getSorted())