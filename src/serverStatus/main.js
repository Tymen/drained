// <=========> Module imports <=========> //

// <=========> Command imports <=========> //
const { updateStatus } = require('./src/updateStatus');


// <=========> Music Commands <=========> //
const serverStatus = {
    updateStatus: async (server) => {
        await updateStatus(server);
    },
}

module.exports = { serverStatus }