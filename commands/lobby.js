const con = require("../connection")
const print = require("../functions/printLobby")




module.exports = {
    name: 'lobby',
    description: 'Displays the lobby in this channel',

    execute(message, args) {
        print(message)
    },
};