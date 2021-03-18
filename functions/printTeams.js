const con = require("../connection")
const Discord = require('discord.js');



let printTeam = (message) => {
    con.query("SELECT * FROM ?? WHERE team = ?", [message.channel.id, 'blue'], (error, bData) => {
        con.query("SELECT * FROM ?? WHERE team = ?", [message.channel.id, 'red'], (error, rData) => {

            let blueTeam = ''
            let redTeam = ''
            for (var i = 0; i < bData.length; i++) {
                blueTeam = blueTeam.concat(bData[i].username + '\n')
                redTeam = redTeam.concat(rData[i].username + '\n')
            }
            const draftEmb = new Discord.MessageEmbed()
                .addFields(
                    { name: "Red Team 🔴", value: redTeam, inline: true },
                    { name: "Blue Team 🔵", value: blueTeam, inline: true },
                )

            message.channel.send(draftEmb);

        })
    })
}

module.exports = printTeam