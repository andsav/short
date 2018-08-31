import {LinkedList} from "../data_structures/linked"

function reverse(L, s, f) {
    let curr = L.head
    let next, prev
    try {
        for (let i = 0; i < s - 1; ++i) {
            curr = curr.next
        }

        let first = curr
        let second = curr.next

        prev = curr
        curr = curr.next

        while (s++ <= f) {
            next = curr.next
            curr.next = prev
            prev = curr
            curr = next
        }

        first.next = prev
        second.next = curr

    } catch (e) {

    }
}

/*
let A = (new LinkedList(1)).append(2).append(3).append(4).append(5).append(6).append(7)

console.log("" + A)
reverse(A, 2, 5)
console.log("" + A)
*/