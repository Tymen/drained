// <=========> Define Variables, Modules <=========> //

// Discord imports
const { Client, Intents} = require('discord.js');
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES
], partials: ["CHANNEL", "REACTION", "MESSAGE"]
});

// Module imports
require('dotenv').config();

const { serverStatus } = require('./src/serverStatus/main')
const eventListener = require('./src/eventListener')

var server = [];

// <=========> Status Message <=========> //
client.once('ready', async () => {
    server = client.guilds.cache.find(guilds => guilds.id === process.env.SERVER_ID)
    eventListener(client, server)

    // Seperate in it's own file
    setInterval(async () => {
        console.log("Status updated!")
        await serverStatus.updateStatus(server)
    }, 900000)

    // client.user.setActivity("Have a good day!", {type: "WATCHING"});
    
    console.log("Bot is online!");
})
// <=========> Login to the discord bot client <=========> //

client.login(process.env.BOT_TOKEN)