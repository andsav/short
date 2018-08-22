import {Tree} from "../data_structures/tree"

/**
 * @return {number}
 */
function LCA(T, a, b) {
    let ancestryA = []
    let ancestryB = []

    const rec = (node, trace = []) => {
        if (!node) {
            return
        }

        trace = trace.concat([node.val])

        if (node.val === a) {
            ancestryA = trace
        } else if (node.val === b) {
            ancestryB = trace
        }

        rec(node.left, trace)
        rec(node.right, trace)
    }

    rec(T)
    let lastCommon = -1

    for (let i = 0; i < ancestryA.length && i < ancestryB.length; ++i) {
        if (ancestryA[i] !== ancestryB[i]) {
            break
        }
        lastCommon = ancestryA[i]
    }

    return lastCommon
}

/*
let A = Tree.build([1, 2, 4, 3, 5, 6], [4, 2, 1, 5, 3, 6])

console.log(
    LCA(A, 3, 6),
    LCA(A, 2, 6)
)*/