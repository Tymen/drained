// There is room for making the code shorter because all the roll status channels could be combined in one.
const { roleCounters } = require('../roleCounter.json')

let getOnlineMembers = async (server) => {
    let count = 0;

    server.members.cache.forEach(member => {
        if (member.presence) {
            if ((
                member.presence.status === 'online' || 
                member.presence.status === 'dnd' || 
                member.presence.status === 'idle') 
                && !member.user.bot) {
                count++;
            }
        }
    })
    return count;
}

let getTotalMembers = async (server) => {
    return await server.members.cache.filter(member => !member.user.bot).size;
}

let setChannelMemberCount = async (server, channel_id) => {
    let channel = server.channels.cache.find(channel => channel.id === channel_id)
    await channel.setName("residents: " + await getTotalMembers(server))
}

let setChannelRoleCount = async (server, {channel_id, role_id, channel_title}) => {
    let count = 0;
    let channel = server.channels.cache.find(channel => channel.id === channel_id)

    server.members.cache.forEach(member => {
        if (member.roles.cache.some(role => role.id === role_id)) {
            count++
        }
    })
    await channel.setName(`${channel_title} ${count}`)
}

let setChannelOnlineCount = async (server, channel_id) => {
    let channel = server.channels.cache.find(channel => channel.id === channel_id)
    await channel.setName("online: " + await getOnlineMembers(server))
}

let setChannelOfflineCount = async (server, channel_id) => {
    let channel = server.channels.cache.find(channel => channel.id === channel_id)
    let offlineMembers = (await getTotalMembers(server)) - (await getOnlineMembers(server))
    await channel.setName("offline: " + offlineMembers)
}

const updateStatus = async (server) => {
    for(let i = 0; i < roleCounters.length; i++) {
        await setChannelRoleCount(server, roleCounters[i]);
    }

    await setChannelMemberCount(server, "994578293674225828")
    await setChannelOnlineCount(server, "994707993419587685")
    await setChannelOfflineCount(server, "994709558905815203")
}

module.exports = { updateStatus };