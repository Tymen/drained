// <=========> Define Variables, Modules <=========> //

// Discord Module
const Discord = require('discord.js');

require('dotenv').config();

// Define Variables
const botName = process.env.BOT_NAME;
const serverName = process.env.SERVER_NAME;
const defaultColor = '#065466'
const defaultAuthor = { name: botName };

// Custom messages
const customMessage = {
    welcomeMessage: (Author, client) => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle("Welcome to the server, " + Author)
        .setAuthor(defaultAuthor)
        .setDescription("Don't forget to read the rules")
        .setThumbnail(Author.avatarURL())
    },
    leaveMessage: (Author, client) => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle(Author + ' left the server')
        .setAuthor(defaultAuthor)
        .setThumbnail(Author.avatarURL())
    },
    help: () => {
        let cPrefix = process.env.COMMAND_PREFIX
        let cSuffix = `<:commands:1001565273196871770> ${cPrefix}`
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle(`${botName} command list`)
        .addFields(
            { name: '. . . . . . . . . . . . . . . . . . . . . . . . .', value: '\u200B', inline: false },
            { name: `**${cSuffix}help**`, value: "shows a list of all available commands", inline: false},
            { name: `**${cSuffix}ann**`, value: "Make a announcement for the server", inline: false},
            { name: `**${cSuffix}event**`, value: "Make a announcement for an event", inline: false},
            { name: `**${cSuffix}mod**`, value: "Make a announcement for the moderators", inline: false},
            { name: `**${cSuffix}admin**`, value: "Make a announcement for admins", inline: false},
            // { name: `**${cSuffix}createchat**`, value: "**DM ONLY** Create a anonymous chat", inline: false},
            // { name: `**${cSuffix}closechat**`, value: "**DM ONLY** Close a anonymous chat", inline: false},
        )
    },
    // safechat: () => {
    //     let cPrefix = process.env.COMMAND_PREFIX
    //     let cSuffix = `<:green:994975541356671086> ${cPrefix}`
    //     return new Discord.MessageEmbed()
    //     .setColor(defaultColor)
    //     .setTitle(`Hello resident!`)
    //     .setDescription("What can i help you with?")
    //     .addFields(
    //         { name: '\u200B', value: '\u200B', inline: false },
    //         { name: `**- Help**`, value: "\u200B", inline: true},
    //         { name: `**- Suggestion**`, value: "\u200B", inline: true}
    //     )
    // },
    safechat: () => {
        let cPrefix = process.env.COMMAND_PREFIX
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setImage("https://cdn.discordapp.com/attachments/980907254490464256/1016027898546757652/safechat-01.png")
    },
    tempMessage: (message, value, delay) => {
        message.channel.send(value).then( msg => {
            setTimeout( () => {
                msg.delete();
            }, delay * 1000);
        })
    },
    queue: (queue) => {
        let embed = new Discord.MessageEmbed();
        embed.setColor(defaultColor)
        embed.setTitle(`${serverName} music queue`)
        embed.setAuthor({name:'\u200B'})
        embed.addField('\u200B', '\u200B', false);
        for (i = 0; i < queue.length; i++) {
            embed.addField(`${i + 1}: ${queue[i].title}`,'\u200B', false);
        }

        return embed;
    }
}

module.exports = { customMessage }