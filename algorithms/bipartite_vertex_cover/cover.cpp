#include <iostream>
#include <vector>
#include <unordered_map>
#include <climits>

#define INF UINT_MAX
#define MAX_M 200

#define FOREACH_NODE for(uint node = 0; node < N; ++node)
#define FOREACH_NODE2 for(uint node = N; node < MAX_NODES; ++node)
#define FOREACH_NODE_NODE2 for(uint node = 0; node < MAX_NODES; ++node)
#define FOREACH_EDGE for(uint edge = 0; edge < F; ++edge)
#define FOREACH_NEIGHBOUR for (auto neighbour : E[node])

#define IGNORE_VISITED if(visited[node]) continue
#define IGNORE_VISITED2 if(visited2[node]) continue
#define IGNORE_UNVISITED if(!visited[node]) continue
#define IGNORE_UNVISITED2 if(!visited2[node]) continue

#define IGNORE_MATCHED if(matched[node] != INF) continue
#define IGNORE_MATCHED2 if(matched2[node] != INF) continue
#define IGNORE_UNMATCHED if(matched[node] == INF) continue
#define IGNORE_UNMATCHED2 if(matched2[node] == INF) continue

#define RESET_VISITED fill(visited, visited + MAX_E, false)
#define RESET_VISITED2 fill(visited2, visited2 + MAX_E, false)

using uint = unsigned int;
using namespace std;

int N, M, F, MAX_E, MAX_NODES;

struct Node {
    bool left;
    uint id;

    Node(bool left, uint id) : left(left), id(id - 1) { }

    Node(uint id) : Node(id < N, id >= N ? id - N + 1: id + 1) { }

    operator uint() {
        return left ? id + 1 : N + id + 1;
    }

    operator string() const {
        return string(left ? "A" : "B") + " " + to_string(id + 1);
    }

    inline static uint A(uint a) {
        return a - 1;
    }

    inline static uint B(uint b) {
        return b - 1 + N;
    }
};

struct Graph {
    vector <vector<uint>> E;

    uint *matched, *matched2;
    bool *visited, *visited2;

    uint max_matching;

    vector <Node> cover;

    Graph() {
        uint a, b;

        max_matching = 0;

        E = vector < vector < uint >> (MAX_E);
        FOREACH_EDGE E[edge].reserve(MAX_M);

        matched = new uint[MAX_E];
        matched2 = new uint[MAX_E];
        visited = new bool[MAX_E];
        visited2 = new bool[MAX_E];

        fill(matched, matched + MAX_E, INF);
        fill(matched2, matched2 + MAX_E, INF);

        RESET_VISITED;
        RESET_VISITED2;

        FOREACH_EDGE {
            cin >> a >> b;

            E[Node::A(a)].push_back(Node::B(b));
            E[Node::B(b)].push_back(Node::A(a));
        }

        /*
        FOREACH_NODE
            FOREACH_NEIGHBOUR
                cout << string(Node(node)) << " -> " << string(Node(neighbour)) << endl;
        cout << endl;
         */
    }

    bool augment_attempt(uint node) {
        visited[node] = true;
        FOREACH_NEIGHBOUR {
            if (visited[neighbour] || matched[neighbour] == node)
                continue;

            if (matched[neighbour] == INF) {
                matched[node] = neighbour;
                matched[neighbour] = node;
                return true;
            }

            visited[neighbour] = true;
            if (augment_attempt(matched[neighbour])) {
                matched[node] = neighbour;
                matched[neighbour] = node;
                return true;
            }
        }

        return false;
    }

    Graph *find_matching() {
        FOREACH_NODE {
            IGNORE_MATCHED;

            RESET_VISITED;

            if (augment_attempt(node))
                max_matching++;
        }

        /*
        FOREACH_NODE {
            IGNORE_UNMATCHED;
            cout << string(Node(node)) << " -> " << string(Node(matched[node])) << endl;
        }
        cout << endl;
        */

        return this;
    }

    void walk(uint node) {
        visited2[node] = true;
        FOREACH_NEIGHBOUR {
            if (visited[neighbour])
                continue;

            visited[neighbour] = true;
            walk(matched[neighbour]);
        }
    }

    Graph *find_cover() {
        FOREACH_NODE {
            IGNORE_UNMATCHED;
            matched2[matched[node]] = node;
        }

        RESET_VISITED;
        RESET_VISITED2;

        FOREACH_NODE2 {
            IGNORE_MATCHED2;
            walk(node);
        }

        FOREACH_NODE {
            IGNORE_UNVISITED;
            cover.push_back(Node(node));
        }

        FOREACH_NODE2 {
            IGNORE_VISITED2;
            cover.push_back(Node(node));
        }

        return this;
    }

    void print() {
        cout << max_matching << endl;
        for (auto c : cover) {
            cout << string(Node(c)) << endl;
        }
    }

    ~Graph() {
        delete matched;
        delete matched2;
        delete visited;
        delete visited2;
    }
};

int main() {
    cin >> N >> M >> F;
    MAX_E = N * M;
    MAX_NODES = N + M;
    Graph G;
    G.find_matching()->find_cover()->print();
}