import {Tree} from "../data_structures/tree"

function isValid(T) {
    let rec = (node, min = -Infinity, max = Infinity) => {
        if (!node) return true
        if (node.val < min || node.val > max) {
            return false
        }
        return rec(node.left, min, node.val) && rec(node.right, node.val, max)
    }
    return rec(T)
}

/*
let A = Tree.build([2, 1, 4, 3, 5], [1, 2, 3, 4, 5])
let B = Tree.build([2, 0, 4, 1, 7], [0, 2, 1, 4, 7])

console.log(
    isValid(A),
    isValid(B)
)
*/