import {LinkedList} from "../data_structures/linked"

function merge(a, b) {
    let ret = new LinkedList()

    let currA = a.head
    let currB = b.head


    while (currA && currB) {
        if (currA.val > currB.val) {
            ret.append(currB.val)
            currB = currB.next
        } else {
            ret.append(currA.val)
            currA = currA.next
        }
    }

    while (currA) {
        ret.append(currA.val)
        currA = currA.next
    }

    while (currB) {
        ret.append(currB.val)
        currB = currB.next
    }

    return ret
}

/*
let A = new LinkedList(2)
let B = new LinkedList(0)
A.append(5).append(6).append(11)
B.append(3).append(7).append(12)

console.log(
    "" + merge(A, B)
)*/