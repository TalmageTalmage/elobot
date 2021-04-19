const con = require("../connection")
const config = require('../config.json');

module.exports = {
    name: 'closelobby',
    aliases: ['close'],
    description: 'Closes the lobby in the current channel',
    execute(message, args) {
        con.query("DROP TABLE ??;", [message.channel.id], (error, results) => {
            if (error) {
                message.channel.send("There does not seem to be a lobby open!")
            }
            else {
                message.channel.send("Lobby closed! Type " + config.prefix + "start to start another one!")
            }
        })
        con.query("DROP TABLE ??;", [message.channel.id + "turnToPick"], (error, data) => {

        })
        con.query("DROP TABLE ??;", [message.channel.id + "scores"], (error, data) => {

        })
        con.query("DELETE FROM openLobbies WHERE channelID = ?", message.channel.id)

    },
};