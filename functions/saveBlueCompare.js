const con = require("../connection")
const config = require('../config.json')
const blueTeam = require("./blueSameTeamWin")



let blueCompare = (message, eloDiff) => {
    con.query("SELECT * FROM openLobbies WHERE channelID = ?", message.channel.id, (error, game) => {
        con.query("SELECT * FROM ?? WHERE TEAM = 'blue'", message.channel.id, (error, rData) => {
            con.query("SELECT * FROM ?? WHERE TEAM = 'red'", message.channel.id, (error, bData) => {
                for (var i = 0; i < rData.length; i++) {

                    for (var b = 0; b < bData.length; b++) {
                        let currentPlayer = rData[i].id
                        let otherPlayer = bData[b].id
                        con.query("SELECT * FROM compare WHERE player1 = ? AND player2 = ? AND guildID = ? AND gameType = ?", [currentPlayer, otherPlayer, message.guild.id, game[0].gameType], (error, compare) => {
                            if (error) {
                            }
                            else if (compare.length == 0) {
                                con.query("INSERT INTO compare SET ?", [{ player1: currentPlayer, player2: otherPlayer, guildID: message.guild.id, gameType: game[0].gameType, winsAgainst: 1, ELODiff: eloDiff, winsWith: 0, lossesAgainst: 0, lossesWith: 0 }], (error, data) => {
                                    if (error) {
                                    }
                                    else {
                                    }
                                })
                            }
                            else {
                                newAgainst = compare[0].winsAgainst + 1
                                newDiff = compare[0].ELODiff + eloDiff

                                con.query('UPDATE compare SET ? WHERE player1 = ? AND player2 = ? AND guildID = ? AND gameType = ?', [{ winsAgainst: newAgainst, ELODiff: newDiff }, currentPlayer, otherPlayer, message.guild.id, game[0].gameType], (error, data) => {
                                    if (error) {
                                    }
                                })
                            }
                        })


                        con.query("SELECT * FROM compare WHERE player1 = ? AND player2 = ? AND guildID = ? AND gameType = ?", [otherPlayer, currentPlayer, message.guild.id, game[0].gameType], (error, compare) => {
                            if (error) {
                                console.log("helloooo")
                            }
                            else if (compare.length == 0) {
                                con.query("INSERT INTO compare SET ?", [{ player1: otherPlayer, player2: currentPlayer, guildID: message.guild.id, gameType: game[0].gameType, winsAgainst: 0, ELODiff: -eloDiff, winsWith: 0, lossesAgainst: 1, lossesWith: 0 }], (error, data) => {
                                    if (error) {
                                    }
                                    else {
                                    }
                                })
                            }
                            else {
                                newAgainst = compare[0].lossesAgainst + 1
                                newDiff = compare[0].ELODiff - eloDiff

                                con.query('UPDATE compare SET ? WHERE player1 = ? AND player2 = ? AND guildID = ? AND gameType = ?', [{ lossesAgainst: newAgainst, ELODiff: newDiff }, otherPlayer, currentPlayer, message.guild.id, game[0].gameType], (error, data) => {
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
    })
    blueTeam(message, eloDiff)

}


module.exports = blueCompare