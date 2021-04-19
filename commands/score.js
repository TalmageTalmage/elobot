const con = require("../connection")
const score = require('../functions/reportScore')
const config = require('../config.json');


module.exports = {
    name: 'score',
    description: "results the lobby. -score (🔴red team score) (🔵blue team score), half the lobby + 1 must report to complete the game!",
    aliases: ['r', 'result', 'report'],

    execute(message, args) {
        con.query("SELECT * FROM openLobbies WHERE channelID = ?", message.channel.id, (error, data) => {
            if (data.length == 0) {
                message.channel.send("There is no lobby to score!")

            }
            else {
                let lobbySize = data[0].lobbySize
                con.query('SELECT * FROM ??', message.channel.id, (error, data, fields) => {
                    if (error) {
                        message.channel.send("There is no lobby to score!")
                    }

                    else if (data.length == lobbySize) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].id == message.author.id) {
                                con.query("SELECT * FROM ?? WHERE id =?", [message.channel.id + "scores", message.author.id], (error, data) => {
                                    if (error) {
                                        score(message, args)
                                    }
                                    else if (data.length == 0) {
                                        score(message, args)

                                    }
                                    else {
                                        con.query("UPDATE ?? SET ?  WHERE id =?", [message.channel.id + "scores", { redScore: args[0], blueScore: args[1] }, message.author.id], (error, data) => {

                                            if (error)
                                                console.log("whoops")
                                        })
                                    }
                                })
                            }
                        }
                    }
                    else {
                        message.channel.send("There is no game to result at the moment!")
                    }

                })
            }
        })

    },
};