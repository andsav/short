#include <iostream>
#include <utility>
#include <stack>
#include <string>
#include <climits>
#include <cmath>

#define INF (long)INT_MAX

using namespace std;

/*
 * Emulate constant time initialization
 */
struct ConstArr {
    pair<long, long> *active;
    long **lc;
    long def;
    long n;

    ConstArr(long n, long def = INF) : def(def), n(n) {
        active = new pair<long, long>[n];

        lc = new long *[n];
        for (long i = 0; i < n; ++i) {
            lc[i] = new long[n];
        }

        fill(lc[0], lc[0] + n, 0);
    }

    void set(long i, long j, long v) {
        lc[i][j] = v;
        active[i].first = min(active[i].first, j);
        active[i].second = max(active[i].second, j);
    }

    long get(long i, long j) {
        if (j < active[i].first || j > active[i].second)
            return def;
        return lc[i][j];
    }

    ~ConstArr() {
        for (long i = 0; i < n; ++i)
           delete[] lc[i];
        delete[] lc;
        delete[] active;
    }
};

int main() {
    cin.sync_with_stdio(false);
    cout.sync_with_stdio(false);

    long n, k, w, i, j, *cost, *keep;         // n words, at most w chars per line
    string s, *words;

    stack <pair<long, long>> lines;

    //
    //  INPUT
    //
    cin >> n >> w;

    //
    //  INITIALIZE
    //
    cost = new long[n + 1];
    fill(cost, cost + n + 1, INF);
    keep = new long[n + 1];
    cost[0] = keep[0] = 0;

    words = new string[n + 1];
    for (i = 0; i < n; ++i) {
        cin >> words[i];
    }

    ConstArr line_cost(n + 1), spaces(n + 1, -1);

    //
    //  COMPUTE LINE COSTS
    //
    for (i = 1; i <= n; ++i) {
        spaces.set(i, i, w - words[i - 1].length());
        for (j = i + 1; j <= n; ++j) {
            spaces.set(i, j, spaces.get(i, j - 1) - words[j - 1].length() - 1);
            if (spaces.get(i, j) <= 0) break;
        }
        for (j = i; j <= n && spaces.get(i, j) >= 0; ++j) {
            line_cost.set(i, j, (j == n) ? 0 : pow(spaces.get(i, j), 2));
        }
    }

    cost[0] = 0;
    for (j = 1; j <= n; ++j) {
        for (i = j; i > 1 && line_cost.get(i, j) < INF; --i);
        for (; i <= j; ++i) {
            if (cost[i - 1] + line_cost.get(i, j) < cost[j]) {
                keep[j] = i;
                cost[j] = cost[i - 1] + line_cost.get(i, j);
            }
        }
    }

    //
    //  RETRIEVE WORDS
    //
    k = n;
    while (keep[k] > 1) {
        lines.push(make_pair(keep[k], k));
        k = keep[k] - 1;
    }
    lines.push(make_pair(keep[k], k));


    cout << cost[n] << " " << lines.size() << endl;
    while (!lines.empty()) {
        cout << words[lines.top().first - 1];
        for (i = lines.top().first; i < lines.top().second; ++i) {
            cout << " " << words[i];
        }
        cout << endl;
        lines.pop();
    }

    //
    //  CLEANUP
    //
    delete[] cost;
    delete[] keep;
    delete[] words;
}
