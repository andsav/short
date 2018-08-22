import {Tree} from "../data_structures/tree"

function isBalanced(T) {
    const height = (node) => {
        if (!node) {
            return [0, 0]
        }
        let val = [1 + Math.max(...height(node.left)), 1 + Math.max(...height(node.right))]
        node.val = val
        return val
    }

    const check = (node) => {
        if (!node) {
            return true
        }
        if (Math.abs(node.val[0] - node.val[1]) > 1) {
            return false
        }
        return check(node.left) && check(node.right)
    }

    height(T)
    return check(T)
}

/*
let A = Tree.build([1, 2, 4, 3, 5, 6], [4, 2, 1, 5, 3, 6])
let B = Tree.build([2, 1, 3, 5, 6], [1, 2, 3, 5, 6])

console.log(isBalanced(A))
console.log(isBalanced(B))
*/