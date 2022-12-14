const { roles } = require('../../config.json')
let maxMembers = 3;
const getMembers = (channelState) => {
    let memberCount = channelState.channel.members;
    return memberCount
}

const createPrivateVoice = async (server, onJoinState, category, channelName) => {
    await server.channels.create(channelName, {
        type: 'GUILD_VOICE',
    }).then( async (channel) => {
        if(category){
            channel.setParent(category.id)
            channel.setUserLimit(maxMembers)   
            await updatePrivateVoicePerms(server, channel.id, {
                'VIEW_CHANNEL': true,
                'CONNECT': true
            })            
        }
        onJoinState.member.voice.setChannel(channel.id)
    })
}

const updatePrivateVoicePerms = async (server, channelId, permissions) => {
    await server.channels.cache.get(channelId).permissionOverwrites.create(roles.Galaxy, permissions)
}
const updateLimit = async (server, channel, limit) => {
    try {
        await channel.setUserLimit(limit)
        await channel.setUserLimit(limit)
        const memberCount = channel.members.size
        if (memberCount >= limit) {
            await updatePrivateVoicePerms(server, channel.id, {
                'VIEW_CHANNEL': false,
                'CONNECT': false
            })
        } else {
            await updatePrivateVoicePerms(server, channel.id, {
                'VIEW_CHANNEL': true,
                'CONNECT': true
            })
        }
        return "voice channel limit updated to: " + limit
    } catch (err){
        console.log(err.code == 50035 ? "Bad Request User limit was to high" : "Something else went wrong with changing user limit")
        return "Something went wrong! Try again!"
    }

}
const privateVoice = async(onLeftState, onJoinState, server, privateChannelID) => {
    const getVCJoin = onJoinState.member.voice.channel;
    const getCategory = server.channels.cache.find(c => c.id == "1025749721005953094");

    if (getVCJoin) {
        let getParentId = await onJoinState.member.voice.channel.parentId;
        if (getVCJoin.id == privateChannelID) {
            const voiceChannelName = `private`
            await createPrivateVoice(server, onJoinState, getCategory, voiceChannelName)
        }

        if(getParentId === getCategory.id) {
            console.log(onLeftState.channel)
            const memberCount = getMembers(onJoinState).size
            if (memberCount >= onJoinState.channel.userLimit) {
                await updatePrivateVoicePerms(server, onJoinState.member.voice.channel.id, {
                    'VIEW_CHANNEL': false,
                    'CONNECT': false
                })            
            }
        }
    }

    if (onLeftState.channel) {
        let getParentId = await onLeftState.channel.parentId;
        if (getParentId === getCategory.id) {
            if(onLeftState.channel.parent.id  === getCategory.id) {
                const memberCount = getMembers(onLeftState).size
                if (memberCount < onLeftState.channel.userLimit) {
                    await updatePrivateVoicePerms(server, onLeftState.channel.id, {
                        'VIEW_CHANNEL': true,
                        'CONNECT': true
                    })
                }
                if (memberCount == 0) {
                    onLeftState.channel.delete()
                }
            }
        }
    };
}

module.exports = { privateVoice, updateLimit }