export function computeHanoi(n) {
    let steps = 0
    let pegs = [[], [], []]

    for (let i = n; i >= 1; --i) {
        pegs[0].push(i)
    }

    const hanoiSteps = (to_move, from, to, use) => {
        if (to_move === 0) return

        hanoiSteps(to_move - 1, from, use, to)

        pegs[to].push(pegs[from].pop())
        steps++

        hanoiSteps(to_move - 1, use, to, from)
    }

    hanoiSteps(3, 0, 1, 2)
    return steps
}