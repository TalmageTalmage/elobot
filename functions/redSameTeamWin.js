const con = require("../connection")
const config = require('../config.json')
const blueTeam = require("./blueSameTeamLoss.js")




let redTeamWinCompare = (message, eloDiff) => {
    con.query("SELECT * FROM openLobbies WHERE channelID = ?", message.channel.id, (error, game) => {

        con.query("SELECT * FROM ?? WHERE team = 'red'", [message.channel.id], (error, data) => {

            for (var i = 0; i < data.length; i++) {
                let currentPlayer = data[i].id


                for (var b = 0; b < data.length; b++) {
                    let otherPlayer = data[b].id
                    con.query("SELECT * FROM compare WHERE player1 = ? AND player2 = ? AND guildID = ? AND gameType = ?", [currentPlayer, otherPlayer, message.guild.id, game[0].gameType], (error, compare) => {
                        if (compare.length == 0) {
                            con.query("INSERT INTO compare SET ?", [{ player1: currentPlayer, player2: otherPlayer, guildID: message.guild.id, gameType: game[0].gameType, winsAgainst: 0, ELODiff: eloDiff, winsWith: 1, lossesAgainst: 0, lossesWith: 0 }], (error, data) => {
                            })
                        }
                        else {
                            newWith = compare[0].winsWith + 1
                            newDiff = compare[0].ELODiff + eloDiff

                            con.query('UPDATE compare SET ? WHERE player1 = ? AND player2 = ? AND guildID = ? AND gameType = ?', [{ winsWith: newWith, ELODiff: newDiff }, currentPlayer, otherPlayer, message.guild.id, game[0].gameType], (error, data) => {
                                if (error) {
                                    console.log(error)
                                }
                            })
                        }
                    })
                }

            }
        })
    })
    blueTeam(message, eloDiff)
}


module.exports = redTeamWinCompare