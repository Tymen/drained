const gPolicies = require('./generalPolicies').generalPolicies

let sendError = (message) => {
    message.channel.send("Something went wrong! Try using this command in the DM of Mr.Bob")
    .then(msg => {
        setTimeout(() => msg.delete(), 5000)
    })
}

// I probabpy overengineered this
const safeChatPolicies = {
    isUserAllowedSafeChat: (server, message) => {
        return new Promise(async (resolve, reject) => {
            await gPolicies.isServerMember(server, message).catch(err => { sendError(message); reject(err)}) ? 
                resolve(true) : reject(false)
        })
    }
}

module.exports = { safeChatPolicies }