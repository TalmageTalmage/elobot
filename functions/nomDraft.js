const con = require("../connection")
const Discord = require('discord.js');




let nomDraft = (message) => {
    console.log("hello nom")
    let userPickQuery = con.query("SELECT * FROM ?? WHERE capt = 1", [message.channel.id], function (err, rows, fields) {
        if (err) throw err;
        const userEmb = new Discord.MessageEmbed()
            .setTitle(rows[0].username + " and " + rows[1].username + " are the captains.");
        message.channel.send(userEmb);
        con.query("UPDATE ?? SET team = 'redCapt' WHERE id = ?", [message.channel.id, rows[0].id], (error, data) => {

        })
        con.query("UPDATE ?? SET team = 'blueCapt' WHERE id = ?", [message.channel.id, rows[1].id], (error, data) => {
        })

        con.query("CREATE TABLE ??(pick VARCHAR(30), PRIMARY KEY (pick));", [message.channel.id + "turnToPick"], (error, result) => {
            con.query("INSERT INTO ?? SET ?", [message.channel.id + "turnToPick", { pick: "blue2" }])
        })

        let draft = con.query("SELECT * FROM ?? WHERE team = ?", [message.channel.id, ''], function (err, r, fields) {
            let availableNames = ''
            let availableElo = ''

            for (var i = 0; i < r.length; i++) {
                availableNames = availableNames.concat(r[i].username + '\n')
                availableElo = availableElo.concat(r[i].elo + '\n')
            }

            if (err) throw err;
            const draftEmb = new Discord.MessageEmbed()
                .setTitle(rows[1].username + ", please draft a player with -draft < @player >")
                .addFields(
                    { name: "Players", value: availableNames, inline: true },
                    { name: "ELO", value: availableElo, inline: true },
                )

            message.channel.send(draftEmb);
        });
    });

}

module.exports = nomDraft