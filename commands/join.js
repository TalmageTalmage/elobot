const con = require("../connection")
const print = require("../functions/printLobby")
const lobbyCheck = require("../functions/lobbyCheck")





module.exports = {
    name: 'join',
    description: 'join the lobby in the channel',
    aliases: ['j'],


    execute(message, args) {

        con.query("SELECT * FROM ?? WHERE id = ?", [message.channel.id, message.author.id], (error, lobbyData) => {
            if (error) { message.channel.send("There does not seem to be a lobby in this channel!") }
            else if (lobbyData.length == 0) {
                con.query("SELECT * FROM openLobbies WHERE channelID = ?", [message.channel.id], (error, gameType) => {
                    console.log(gameType)
                    con.query("SELECT * FROM ??", message.channel.id, (error, lobbyFull) => {
                        if (lobbyFull.length == gameType.lobbySize) {
                            message.channel.send("The lobby is full!")
                        }

                        else {
                            con.query("SELECT * FROM leaderboards WHERE gameType=? AND guildID=? AND playerID=?", [gameType[0].gameType, message.guild.id, message.author.id], (error, leaderData) => {
                                if (leaderData.length == 0) {
                                    con.query("INSERT INTO leaderboards SET ?", [{ username: message.author.username, playerID: message.author.id, gameType: gameType[0].gameType, elo: 1000, wins: 0, losses: 0, guildID: message.guild.id }])
                                    con.query("INSERT INTO ?? SET ?", [message.channel.id, { id: message.author.id, username: message.author.username, elo: 1000, team: "" }])
                                    print(message)
                                    lobbyCheck(message)

                                }
                                else {
                                    con.query("INSERT INTO ?? SET ?", [message.channel.id, { id: message.author.id, username: message.author.username, elo: leaderData[0].elo, team: "" }])
                                    print(message)
                                    lobbyCheck(message)
                                }
                            })
                        }
                    })
                })
            }
            else {
                message.channel.send("You are already in the lobby!")
            }
        })


    },
};