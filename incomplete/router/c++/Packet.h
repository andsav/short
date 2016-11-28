#ifndef ROUTING_PACKET_H
#define ROUTING_PACKET_H

#define NBR_ROUTER 5

#include <string>
#include <memory>

#include "State.h"

struct Packet
{
    unsigned int router_id;

    char const* encode() const;

    static std::unique_ptr<Packet> make(std::string&);
    void update_state(State&);
};

struct PacketInit : public Packet
{
    char const* encode() const;
};

struct PacketHello : public Packet
{
    unsigned int link_id;

    char const* encode() const;
};

struct PacketLS : public Packet
{
    unsigned int sender;
    unsigned int link_id;

    unsigned int cost;
    unsigned int via;

    char const* encode() const;
};


#endif //ROUTING_PACKET_H
