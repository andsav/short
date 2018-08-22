class Node {
    constructor(val, next = null) {
        this.val = val
        this.next = next
    }
}

export class LinkedList {
    constructor(val = null) {
        this.head = new Node(val)
        this.tail = this.head
    }

    append(val) {
        if (this.head.val === null) {
            this.head.val = val
            return this
        }
        const node = new Node(val)
        this.tail.next = node
        this.tail = node
        return this
    }

    prepend(val) {
        if (this.head.val === null) {
            this.head.val = val
            return this
        }
        this.head = new Node(val, this.head)
        return this
    }

    pop() {
        let curr = this.head
        try {
            while (curr.next.next) {
                curr = curr.next
            }
        } catch (e) {
        }
        curr.next = null
        this.tail = curr
        return this
    }

    toString() {
        let ret = []
        let curr = this.head
        try {
            while (curr) {
                ret.push(curr.val)
                curr = curr.next
            }
        } catch (e) {

        }
        return '[' + ret.join(']-->[') + ']'
    }
}