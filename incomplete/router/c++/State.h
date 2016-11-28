#ifndef ROUTING_STATE_H
#define ROUTING_STATE_H

#include <iostream>
#include <queue>
#include <unordered_map>
#include <climits>

#define INF INT_MAX

struct Link {
    std::pair<unsigned int, unsigned int> nodes;
    int cost;
};


struct State {

    unsigned int this_id;

    State(unsigned int);

};

#endif //ROUTING_STATE_H
