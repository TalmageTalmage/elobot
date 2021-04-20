const con = require("../connection")
const startDraft = require("./startDraft")
const nomDraft = require("./nomDraft")

let lobbyCheck = (message) => {

    con.query("SELECT * FROM ??", [message.channel.id], (error, data) => {
        con.query("SELECT * FROM openLobbies WHERE channelID =? AND guildID=?", [message.channel.id, message.guild.id], (error, lobbyData) => {
            console.log(lobbyData)
            if (lobbyData[0].captType === "rating") {
                console.log("rating")
                if (data.length == lobbyData[0].lobbySize) {
                    message.channel.send("The draft is beginning!")
                    startDraft(message)
                }
                else {
                    message.channel.send(lobbyData[0].lobbySize - data.length + " more people are needed to start!")
                }
            }
            else {
                if (data.length == lobbyData[0].lobbySize) {
                    con.query("SELECT * FROM ?? WHERE capt = 1", message.channel.id, (error, captData) => {

                        if (captData.length > 2) {
                            message.channel.send("Too many players have self nominated! Someone please -uncapt")
                        }
                        else if (captData.length === 2) {

                            console.log("nom")
                            message.channel.send("The draft is beginning!")
                            nomDraft(message)
                        }
                        else if (captData.length < 2) {
                            message.channel.send("You do not have enough captains. You need to captains to start. Players that would like to nominate themselves can use -capt")
                        }
                    })
                }
                else {
                    message.channel.send(lobbyData[0].lobbySize - data.length + " more people are needed to start!")
                }
            }
        })
    })


}

module.exports = lobbyCheck