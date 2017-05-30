#include <iostream>
#include <queue>
#include <deque>
#include <vector>
#include <unordered_map>

#define MAX_N 100000

using namespace std;
using ulong = unsigned long;

inline ulong key(ulong i, ulong k) {
    return MAX_N * k + i;
}

inline ulong val(ulong key) {
    return key % MAX_N;
}

struct Graph {
    ulong final_u;
    unordered_map<ulong, vector<ulong> > E;
    unordered_map<ulong, ulong> dist, parent;
    unordered_map<ulong, bool> visited;

    bool bfs(ulong s, ulong t) {
        queue <ulong> Q;
        ulong u;

        Q.push(key(s, 0));
        dist[key(s, 0)] = 0;

        while (!Q.empty()) {
            u = Q.front();
            Q.pop();

            for (auto v: E[u]) {
                if(!visited[v]) {
                    visited[v] = true;
                    Q.push(v);
                    parent[v] = u;
                    dist[v] = dist[u] + 1;

                    if (val(v) == t) {
                        final_u = v;
                        return true;
                    }
                }
            }
        }

        return false;
    }

    void print_path(ulong s, ulong t) {
        deque <ulong> path;
        path.push_front(t);

        while (path.front() != s)
            path.push_front(parent[path.front()]);

        cout << val(path.front());
        path.pop_front();
        for (auto v: path)
            cout << " " << val(v);
        cout << endl;
    }
};

int main() {
    ulong
            i, j,
            a, b, c,
            s, t,           // Source and Destination
            K,              // $ available
            N,              // Number of nodes
            M;              // Number of edges

    cin >> N >> K >> M;

    if (M == 0) {
        cout << "-1" << endl;
        return 0;
    }

    Graph G;

    for (i = 0; i < M; ++i) {
        cin >> a >> b >> c;
        if (c == 0) {
            for (j = 0; j <= K; ++j) {
                G.E[key(a, j)].push_back(key(b, j));
            }
        } else {
            for (j = 0; j < K; ++j) {
                G.E[key(a, j)].push_back(key(b, j + 1));
            }
        }
    }

    cin >> s >> t;
    if (G.bfs(s, t)) {
        cout << G.dist[G.final_u] << endl;
        G.print_path(key(s, 0), G.final_u);
    } else {
        cout << "-1" << endl;
    }
}