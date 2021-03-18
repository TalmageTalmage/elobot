const con = require("../connection")
const startDraft = require("./startDraft")



let lobbyCheck = (message) => {

    con.query("SELECT * FROM ??", message.channel.id, (error, data) => {
        con.query("SELECT * FROM lobbies WHERE id =? AND guildID=?", [message.channel.id, message.guild.id], (error, lobbyData) => {

            if (data.length == lobbyData[0].lobbySize) {
                message.channel.send("The draft is beginning!")
                startDraft(message)
            }
            else {
                message.channel.send(lobbyData[0].lobbySize - data.length + " more people are needed to start!")
            }
        })
    })


}

module.exports = lobbyCheck