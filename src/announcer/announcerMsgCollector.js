// This code needs refactoring Not happy on how it looks and works!
const startCollector = async (message, prefix, server, channelId, type) => {
    const confirmation = await message.channel.send("**Hello!**\n\nYou can type the announcement for **" + type + "**, and send it in this channel.\nThe session will end in 20 minutes.\n\nUse `" + prefix + "cancel` to cancel the message.");

    const filter = (m) => m.author.id === message.author.id;
    const collector = await confirmation.channel.createMessageCollector(filter, {
    time: 1200000,
    });
    const sendDevider = () => {
        message.channel.send("**. . . . . . . . . . . . . . . . . . . . . . . . .**")
    }
    sendDevider()
    collector.on('end', (collected, reason) => {
        // only send a message when the "end" event fires because of timeout
        message.channel.send(`This session has ended.`);
    });

    let announcementContent = "";
    // fires when a response is collected
    collector.on('collect', async (msg) => {
        if (msg.author.bot) return;
        if(msg.content.toLowerCase().startsWith(`${prefix}cancel`)) {
            return collector.stop()
        }
        if(msg.content.toLowerCase().startsWith(`${prefix}submit`)) {
            if(announcementContent.length > 0) {
                message.channel.send("The message has been send!")
                collector.stop()
                return server.channels.cache.get(channelId).send(announcementContent)
            }
        }
        if(!msg.content.toLowerCase().startsWith(prefix)) {
            announcementContent = msg.content
            message.channel.send("**Are you sure that you want to send this message?**\n\nUse `"+ prefix +"cancel` to cancel the message.\nUse `" + prefix + "submit` to send the message.\n\n*Please make sure that the information in the message is accurate before submitting.*")
            sendDevider()
        }
        return
    });
}
module.exports = { startCollector }