const { startCollector } = require('./announcerMsgCollector')
const gPolicies = require('../policies/generalPolicies').generalPolicies
const announcer = {
    sendMessage: async (message, prefix, server, channelId, type) => {
        await gPolicies.hasAdminRole(message.member).then(async () => {
            await startCollector(message, prefix, server, channelId, type)
        }).catch(err => {console.log(err)})
    }
}
module.exports = { announcer }