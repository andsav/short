export class Tree {
    constructor(val) {
        this.val = val
        this.left = this.right = null
    }

    preOrder() {
        let arr = []
        const rec = (node) => {
            if (!node) {
                return
            }
            arr.push(node.val)
            rec(node.left)
            rec(node.right)
        }
        rec(this)
        return arr
    }

    static build(preOrder, inOrder) {
        if (inOrder.length === 0) return null

        const restore = (preStart, preEnd, inStart, inEnd) => {
            if (preStart > preEnd || inStart > inEnd) {
                return null
            }

            let val = preOrder[preStart]
            let node = new Tree(val)
            let k = inOrder.indexOf(val)

            node.left = restore(preStart + 1, preStart + (k - inStart), inStart, k - 1)
            node.right = restore(preStart + (k - inStart) + 1, preEnd, k + 1, inEnd)

            return node
        }

        return restore(0, inOrder.length - 1, 0, inOrder.length - 1)
    }
}