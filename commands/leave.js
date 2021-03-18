const con = require("../connection")
const print = require("../functions/printLobby")




module.exports = {
    name: 'leave',
    description: 'Leaves the lobby!',
    aliases: ['l'],

    execute(message, args) {

        con.query("SELECT * FROM ?? WHERE id =?", [message.channel.id, message.author.id], (error, gData) => {
            if (error) message.channel.send("There does not seem to be a lobby in this channel!")
            else if (gData.length == 0) {
                message.channel.send("You do not seem to be in this lobby!")
            }
            else {
                con.query("DELETE FROM ?? WHERE id=?", [message.channel.id, message.author.id], (error, data) => {

                    message.channel.send(message.author.username + " has left he lobby!")
                    print(message)

                })
            }
        })
    },
};