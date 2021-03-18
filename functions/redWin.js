const con = require("../connection")
const Discord = require('discord.js');
const config = require('../config.json')

const eloUpdate = require("./eloUpdate.js");




let redWin = (message) => {

    let redElo = 0
    let blueElo = 0
    con.query("SELECT * FROM lobbies WHERE id = ?", message.channel.id, (error, gameType) => {

        teamSize = gameType[0].lobbySize
        team = gameType[0].lobbySize / 2

        con.query("SELECT * FROM ??", [message.channel.id], (error, data) => {
            con.query("SELECT * FROM ??", [message.channel.id + "scores"], (error, scores) => {
                //calculates elo totals and then figures out elo update

                for (var i = 0; i < data.length; i++) {
                    if (data[i].team == "red") {
                        redElo = data[i].elo + redElo
                        console.log(data[i])
                    }

                    else {
                        blueElo = data[i].elo + blueElo
                        console.log(data[i])
                    }

                    console.log("red elo = " + redElo + " blue elo = " + blueElo)
                }

                redElo = redElo 
                blueElo = blueElo
                eloDiff = eloUpdate(blueElo, redElo)
                // for loop to update players 
                for (var i = 0; i < data.length; i++) {

                    if (data[i].team == "red") {
                        con.query("SELECT * FROM leaderboards WHERE playerID = ? AND gameType = ? AND guildID = ?", [data[i].id, gameType[0].gameType, message.guild.id], (error, leaderData) => {
                            let newELO = leaderData[0].elo + eloDiff
                            let newWins = leaderData[0].wins + 1
                            con.query('UPDATE leaderboards SET ? WHERE playerID = ? AND guildID = ? AND gameType = ? ', [{ elo: newELO, wins: newWins }, leaderData[0].playerID, message.guild.id, gameType[0].gameType])
                        })

                    }
                    else if (data[i].team == "blue") {
                        con.query("SELECT * FROM leaderboards WHERE playerID =? AND gameType=? AND guildID=?", [data[i].id, gameType[0].gameType, message.guild.id], (error, leaderData) => {
                            let newELO = leaderData[0].elo - eloDiff
                            let newLosses = leaderData[0].losses + 1
                            con.query('UPDATE leaderboards SET ? WHERE playerID = ? AND guildID = ? AND gameType = ?', [{ elo: newELO, losses: newLosses }, leaderData[0].playerID, message.guild.id, gameType[0].gameType])
                        })
                    }
                }

                con.query('DROP TABLE ??', message.channel.id)
                con.query('DROP TABLE ??', message.channel.id + "scores")
                con.query("DELETE FROM lobbies WHERE id = ?", message.channel.id)



            })
        })
    })
}

module.exports = redWin
