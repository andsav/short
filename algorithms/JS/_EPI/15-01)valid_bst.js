import {Tree} from "../data_structures/tree"

export function isValid(T) {
    let rec = (node, min = -Infinity, max = Infinity) => {
        if (!node) return true
        if (node.val < min || node.val > max) {
            return false
        }
        return rec(node.left, min, node.val) && rec(node.right, node.val, max)
    }
    return rec(T)
}