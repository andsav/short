import {LinkedList} from "../data_structures/linked"

export function merge(a, b) {
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
