function nextState(board) {
    let cellState = (i, j) => {
        if (i < 0 || j < 0 || i >= board.length || j >= board[0].length) {
            return 0
        }
        return board[i][j]
    }

    let liveNeighbours = (i, j) => {
        return [
            cellState(i - 1, j - 1),
            cellState(i - 1, j),
            cellState(i - 1, j + 1),
            cellState(i, j - 1),
            cellState(i, j + 1),
            cellState(i + 1, j - 1),
            cellState(i + 1, j),
            cellState(i + 1, j + 1)
        ].reduce((a, b) => a + b, 0)
    }

    let live = []
    board.forEach((row, i) => {
        live.push([])
        row.forEach((cell, j) => {
            console.log(i, j, liveNeighbours(i, j))
            live[live.length - 1].push(liveNeighbours(i, j))
        })
    })

    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            console.log(cell, live[i][j])
            board[i][j] = (cell === 1 && (live[i][j] === 2 || live[i][j] === 3)) || live[i][j] === 3 ? 1 : 0
        })
    })
}