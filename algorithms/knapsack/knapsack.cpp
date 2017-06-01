#include <iostream>

#define FOR_0N for(i=0; i<N; ++i)
#define FOR_1N for(i=1; i<N; ++i)
#define FOR_0W for(j=0; j<W+1; ++j)
#define FOR_N0 for(i=N-1; i>=0; --i)

using namespace std;

int main() {
    int N, W, *s, *w, *picks, i, j, si, wi, **memo;
    bool **pick;
    cin >> N >> W;

    /*
     * INIT
     */
    picks = new int[N];
    s = new int[N];
    w = new int[N];
    memo = new int *[N];
    pick = new bool *[N];

    FOR_0N {
        cin >> wi >> si;
        w[i] = wi;
        s[i] = si;

        memo[i] = new int[W + 1];
        pick[i] = new bool[W + 1];
    }

    /*
     * BUILD TABLE
     */
    FOR_0W memo[0][j] = 0;
    FOR_1N FOR_0W memo[i][j] = (j < w[i]) ? 0 : max(s[i] + memo[i - 1][j - w[i]], memo[i - 1][j]);
    FOR_0N FOR_0W pick[i][j] = memo[i][j] != 0 && s[i] + memo[i - 1][j - w[i]] > memo[i - 1][j];


    /*
     * OUTPUT
     */

    cout << memo[N - 1][W];                                                         // S max weight

    j = 0;
    FOR_N0 {
        if(W <= 0) break;
        if (pick[i][W]) {
            picks[j] = i + 1;
            W -= w[i];
            j++;
        }
    }

    cout << " " << j << endl;                                                       // K # of picks


    if(j > 0) {
        cout << picks[0];
        for (i = 1; i < j; ++i) cout << " " << picks[i];                            // indexes i
        cout << endl;
    }

    // Cleanup
    delete s;
    delete w;
    delete picks;
    FOR_0N {
        delete[] memo[i];
        delete[] pick[i];
    }
    delete[] memo;
    delete[] pick;
};