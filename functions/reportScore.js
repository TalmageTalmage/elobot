const con = require("../connection")
const config = require('../config.json');
const redWin = require('./redWin')
const blueWin = require('./blueWin')

const Discord = require('discord.js');



let scoreReport = (message, args) => {

    con.query("SELECT * FROM lobbies WHERE id=?", message.channel.id, (error, data) => {
        let report = data[0].lobbySize / 2

        con.query("CREATE TABLE ??(id VARCHAR(30), redScore INT, blueScore INT, PRIMARY KEY (id));", [message.channel.id + "scores"], (error, data) => {
            if (error) console.log("not an error")

        })
        con.query("INSERT INTO ?? SET ?", [message.channel.id + "scores", { id: message.author.id, redScore: args[0], blueScore: args[1] }], (error, data) => {
            if (error) {
                console.log("not an error")
            }
        })
        con.query("SELECT * FROM ??", [message.channel.id + "scores"], (error, data) => {
            if (data.length >= report + 1) {
                let red = 0
                let blue = 0
                message.channel.send("Game reported!")
                for (var i = 0; i < data.length; i++) {
                    red = data[i].redScore + red
                    blue = data[i].blueScore + blue
                }
                if (red > blue) {
                    message.channel.send("Red team wins!")
                    redWin(message)
                }
                else if (blue > red) {
                    message.channel.send("Blue team wins!")
                    blueWin(message)
                }
                else {
                    message.channel.send("It's a tie!")
                    con.query('DROP TABLE ??', [message.channel.id])
                    con.query('DROP TABLE ??', [message.channel.id + "scores"])
                }
            }
        })
    })
}

module.exports = scoreReport