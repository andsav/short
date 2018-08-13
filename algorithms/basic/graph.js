export class Graph {
    constructor(directed = false) {
        this.directed = directed
        this.edges = Object.create(null)
    }

    addEdge(from, to) {
        if (!(from in this.edges)) {
            this.edges[from] = []
        }
        this.edges[from].push(to)
        if (!this.directed) {
            if (!(to in this.edges)) {
                this.edges[to] = []
            }
            this.edges[to].push(from)
        }
    }

    bfs(from, fn) {
        let seen = Object.create(null)
        let dist = Object.create(null)
        let parent = Object.create(null)

        dist[from] = 0
        parent[from] = null

        let q = [from]
        let offset = 0

        while (offset < q.length) {
            let u = q[offset]
            for (let v of this.edges[u]) {
                if ((v in seen)) {
                    continue
                }
                dist[v] = dist[u] + 1
                parent[v] = u
                q.push(v)
            }
        }

        fn(seen, dist, parent)
    }

    dfs(from, fn) {
        let seen = Object.create(null)
        let dist = Object.create(null)
        let parent = Object.create(null)

        let s = [from]
        while (s.length !== 0) {
            let u = s.pop()
            for (let v of this.edges[u]) {
                if ((v in seen)) {
                    continue
                }
                dist[v] = dist[u] + 1
                parent[v] = u
                s.push(v)
            }
        }

        fn(seen, dist, parent)
    }
}