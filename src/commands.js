// <=========> Define Variables, Modules <=========> //

// Module imports
require('dotenv').config();

const { customMessage } = require('./customMessage')
const { serverStatus } = require('./serverStatus/main');
const { updateLimit } = require('./privateVoice/main');
const { announcer } = require('./announcer/index')
const { channelId } = require('../config.json')
const gPolicies = require('./policies/generalPolicies').generalPolicies;

// Define Variable
const prefix = process.env.COMMAND_PREFIX;
const reply = (message, value) => {
    return message.channel.send(value)
}
const replyEmbed = (message, value) => {
    return message.channel.send({ embeds: [value] })
}
/**
 * Need to organise this so its more clear what command belongs to what functionality
 * 
 * Might also wanna put all the functionality in a seperate folder
 */

// <=========> Command Handler <=========> //
const EventResponse = async (message, client, server) => {
    if (!message.author.bot && message.content.startsWith(prefix)){

        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        switch(command) {
            case 'setlimit':
                let getChannel = message.member.voice.channel;
                if (getChannel) {
                    let replyMessage = await updateLimit(server, getChannel, args[0])
                    await reply(message, replyMessage)
                }
                break;
        }
        // switch(command) {
        //     case 'help':
        //         await gPolicies.hasAdminRole(message.member).then(async () => {
        //             replyEmbed(message, customMessage.help())
        //         }).catch(err => {console.log(err)})
        //         break;
        //     case 'closechat': {
        //         safeChat.closeChat(message, args, server, db.safeChatUsers, client);
        //         break;
        //     }
        //     case 'safechat': {
        //         await gPolicies.isSuperUser(message.member).then(async () => {
        //             safeChat.createSafeChat(message, customMessage.safechat(), server, db.safeChatUsers);
        //         }).catch(err => {console.log(err)})
        //         break;
        //     }
        //     case 'ann': {
        //         await gPolicies.hasAdminRole(message.member).then(async () => {
        //             announcer.sendMessage(message, prefix, server, channelId.announcement, "announcement")
        //         }).catch(err => {console.log(err)})
        //         break;
        //     }
        //     case 'event': {
        //         await gPolicies.hasModRole(message.member).then(async () => {
        //             announcer.sendMessage(message, prefix, server, channelId.events, "event")
        //         }).catch(err => {console.log(err)})
        //         break;
        //     }
        //     case 'admin': {
        //         await gPolicies.isSuperUser(message.member).then(async () => {
        //             announcer.sendMessage(message, prefix, server, channelId.admin, "admin")
        //     }).catch(err => {console.log(err)})
        //         break;
        //     }
        //     case 'mod': {
        //         await gPolicies.hasAdminRole(message.member).then(async () => {
        //             announcer.sendMessage(message, prefix, server, channelId.mod, "mod")
        //         }).catch(err => {console.log(err)})
        //         break;
        //     }
        //     case 'updatestatus': {
        //         await gPolicies.hasAdminRole(message.member).then(async () => {
        //             serverStatus.updateStatus(server);
        //         }).catch(err => {console.log(err)})
        //         break;
        //     }
        // }
    }

    // <=========> Console message monitor <=========> //
    // console.log(message.author.username + ": " + message.content)
}

module.exports = { EventResponse }