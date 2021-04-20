const con = require("../connection")
const Discord = require('discord.js');
const config = require('../config.json')



let print = (message) => {
    con.query("SELECT* FROM ?? ORDER BY elo DESC", [message.channel.id], (error, r) => {
        if (error) {
            message.channel.send("There does not seem to be a lobby open! Type " + config.prefix + "start to start a lobby!")
        }
        else {
            if (r.length == 0) {
                message.channel.send("The lobby is empty!")
            }
            else {
                let availableNames = ''
                let availableElo = ''
                let isCapt = ''


                for (var i = 0; i < r.length; i++) {
                    if (r[i].capt === 1) {
                        r[i].capt = "✅"
                    }
                    else if (r[i].capt === 0) {
                        r[i].capt = "❌"
                    }
                    availableNames = availableNames.concat(r[i].username + '\n')
                    availableElo = availableElo.concat(r[i].elo + '\n')
                    isCapt = isCapt.concat(r[i].capt + '\n')

                }
                const draftEmb = new Discord.MessageEmbed()
                    .addFields(
                        { name: "Players", value: availableNames, inline: true },
                        { name: "ELO", value: availableElo, inline: true },
                        { name: "Captain", value: isCapt, inline: true },

                    )
                message.channel.send(draftEmb);
            }
        }

    });

}

module.exports = print