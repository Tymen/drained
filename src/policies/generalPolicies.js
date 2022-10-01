require('dotenv').config()
const { roles } = require('../../config.json')

const generalPolicies = {
    isSuperUser: (member) => {
        return new Promise( async (resolve, reject) => {
            if (member) {
                member._roles.find(role => role === roles.MAINADMIN || role === roles.OWNER) ? resolve(true) : reject("User does not have the role: Main Admin or Owner")
            } else {
                reject("User does not exist in the server!")
            }
        })
    },
    isServerMember: (server, message) => {
        return new Promise((resolve, reject) => {
            server.members.cache.has(message.author.id) ? resolve(true) : reject(false)
        })
    },
    isDM: (message) => {
        return new Promise((resolve, reject) => {
            message.channel.type === "DM" ? resolve(true) : reject(false)
        })
    },
    hasConversationRole: (message, server) => {
        return new Promise( async (resolve, reject) => {
            let member = await server.members.fetch(message.author.id)
            if (member) {
                member._roles.find(role => role === roles.CONVERSATIONS) ||
                    await generalPolicies.isSuperUser(member).catch(err => {console.log(err)}) ? 
                        resolve(true) : reject("User does not have the role: CONVERSATIONS")
            } else {
                reject("User does not exist in the server!")
            }
        })
    },
    hasModRole: (member) => {
        return new Promise( async (resolve, reject) => {
            if (member) {
                member._roles.find(role => role === roles.MOD) || 
                    await generalPolicies.isSuperUser(member).catch(err => {console.log(err)}) ? 
                        resolve(true) : reject("User does not have the role: Admin")
            } else {
                reject("User does not exist in the server!")
            }
        })
    },
    hasAdminRole: (member) => {
        return new Promise( async (resolve, reject) => {
            if (member) {
                member._roles.find(role => role === roles.ADMIN) || 
                    await generalPolicies.isSuperUser(member).catch(err => {console.log(err)}) ? 
                        resolve(true) : reject("User does not have the role: Admin")
            } else {
                reject("User does not exist in the server!")
            }
        })
    }
}

module.exports = { generalPolicies }