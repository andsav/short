#include <iostream>
#include <climits>

using namespace std;

int main() {
    int max_current, max_carried, i;
    while(cin >> i) {
        max_current = max(max_current + i, 0);
        max_carried = max(max_carried, max_current);
    }
    cout << max_carried << endl;
}