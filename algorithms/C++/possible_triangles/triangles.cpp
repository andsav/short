#include <iostream>
#include <cstring>
#include <cstdint>

using namespace std;

void multiply(int64_t *, int64_t *, unsigned int, int64_t *);

int main() {
    unsigned int i, j, n, r;
    int64_t *p, *result, total_sides, total_combinations, impossible;

    cin >> n;

    r = n + 1;
    if((r & n) != 0) {
        // Pad the arrays: use the next power of 2
        // Source: http://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2Float
        float f = (float) r;
        unsigned int const t = 1U << ((*(unsigned int *) &f >> 23) - 0x7f);
        r = t << (t < (n + 1));
    }

    // Get Input
    p = new int64_t[r];

    p[0] = total_sides = 0;
    for (i = 1; i <= n; ++i) {
        cin >> p[i];
        total_sides += p[i];
    }

    if(total_sides < 3) {
        cout << 0 << endl;
        return 1;
    }

    // total choose 3
    total_combinations = total_sides * (total_sides - 1)/2 * (total_sides - 2)/3;

    // Compute p^2
    result = new int64_t[2 * r];
    multiply(p, p, r, result);

    // Remove duplicates from count
    for(i = 0;  i <= n; ++ i)
        result[2*i] -= p[i];

    for (i = 0; i < 2 * n + 1; ++i)
        result[i] /= 2;

    // Compute the number of impossible triangles
    impossible = 0;
    for(i = 0; i < 2 * n + 1; ++i) {
        if(result[i] == 0) continue;
        for(j = n; j >= i; --j)
            impossible += p[j] * result[i];
    }

    cout << total_combinations - impossible << endl;

    delete[] p;
    delete[] result;
}


void multiply(int64_t *p, int64_t *q, unsigned int r, int64_t *result) {
    unsigned int i, j, half;

    memset(result, 0, r * 2 * sizeof(int64_t));

    if (r <= 4) {
        for (i = 0; i < r; ++i)
            for (j = 0; j < r; ++j)
                result[i + j] += p[i] * q[j];
        return;
    }

    int64_t *pp, *qq;

    half = r / 2;

    pp = new int64_t[r];
    qq = new int64_t[r];

    for (i = 0; i < half; ++i) {
        pp[i] = p[i] + p[half + i];
        qq[i] = q[i] + q[half + i];
        pp[half + i] = qq[half + i] = 0;
    }

    multiply(pp, qq, half, result + half);
    multiply(p, q, half, pp);
    multiply(p + half, q + half, half, qq);

    for (i = 0; i < r; ++i) {
        result[i] += pp[i];
        result[half + i] -= pp[i] + qq[i];
        result[r + i] += qq[i];
    }

    delete[] pp;
    delete[] qq;

}