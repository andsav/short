#include <iostream>
#include <utility>
#include <stack>
#include <string>
#include <climits>
#include <cmath>
#include <unordered_map>

#define INF (long)INT_MAX

using namespace std;

struct Spaces {
    pair<long, long> *active;
    unordered_map<int64_t, long> arr;
    long def, n;

    Spaces(long n, long def = INF) : def(def), n(n) {
        arr.reserve(n * 81);

        active = new pair<long, long>[n];
        for (long i = 0; i < n; ++i)
            active[i] = make_pair(i, i);
    }

    void set(long i, long j, long v) {
        if (v == def)
            return;

        arr[k(i, j)] = v;

        active[i].first = min(active[i].first, j);
        active[i].second = max(active[i].second, j);
    }

    inline long get(long i, long j) {
        if (i == 0)
            return 0;
        if (j < active[i].first || j > active[i].second)
            return def;

        return arr[k(i, j)];
    }

    inline int64_t k(long i, long j) {
        return ((int64_t) i << 32) + j;
    }

    inline long line_cost(long i, long j) {
        return (i == 0)
               ? 0
               : (j < i || get(i, j) < 0)
                 ? INF
                 : (j == n - 1)
                   ? 0
                   : pow(arr[k(i, j)], 2);
    }

    ~Spaces() {
        delete[] active;
    }
};

long n, k, w, i, j, *cost, *keep;         // n words, at most w chars per line
string *words;

stack <pair<long, long>> lines;

int main() {
    std::ios::sync_with_stdio(false);

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

    words = new string[n];
    for (i = 0; i < n; ++i) {
        cin >> words[i];
    }

    Spaces spaces(n + 1, -1);


    //
    //  COMPUTE LINE COSTS
    //
    for (i = 1; i <= n; ++i) {
        spaces.set(i, i, w - words[i - 1].length());
        for (j = i + 1; j <= n; ++j) {
            k = spaces.get(i, j - 1) - words[j - 1].length() - 1;
            spaces.set(i, j, k);
            if (k <= 0) break;
        }
    }

    for (j = 1; j <= n; ++j) {
        for (i = j; i > 1 && spaces.line_cost(i, j) < INF; --i);
        for (; i <= j; ++i) {
            if (cost[i - 1] + spaces.line_cost(i, j) < cost[j]) {
                keep[j] = i;
                cost[j] = cost[i - 1] + spaces.line_cost(i, j);
            }
        }
    }

    //
    //  RETRIEVE WORDS
    //
    k = n;
    while (k >= 1 && keep[k] > 1) {
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
