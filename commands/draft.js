const con = require("../connection")
const Discord = require('discord.js');
const client = new Discord.Client();
const printTeams = require('../functions/printTeams')





module.exports = {
    name: 'draft',
    description: '-draft <@player>',
    aliases: ['d', 'p', 'pick'],
    execute(message, args) {
        con.query("SELECT * FROM ??", [message.channel.id + "turnToPick"], (error, data) => {
            if (error) { message.channel.send("There does not seem to be a draft at the moment.") }

            else if (data[0].pick == "red2") {//reds second pick
                console.log("red2")
                con.query("SELECT * FROM ?? WHERE team = 'redCapt'", [message.channel.id], (error, data) => {
                    if (data.length == 0) {
                        message.channel.send("You cannot pick a player right now!")
                    }
                    else if (message.author.id == data[0].id) {
                        let drafted = getUserFromMention(args[0])

                        con.query("SELECT * FROM ?? WHERE id =?", [message.channel.id, drafted], (error, data) => {

                            if (data.length == 0) {
                                message.channel.send("This is not an available player!")
                            }
                            else if (data[0].team != '') {
                                message.channel.send("This user is already on " + data[0].team + " team!")
                            }
                            else {
                                con.query("UPDATE ?? SET pick = 'blue'", [message.channel.id + "turnToPick"])
                                con.query("UPDATE ?? SET team = 'red' WHERE id = ? ", [message.channel.id, drafted])
                                message.channel.send("Red team picked " + args[0] + "!")

                                con.query("SELECT * FROM ?? WHERE team = ''", [message.channel.id], (error, data) => {
                                    if (data.length == 0) {
                                        con.query("DROP TABLE ??", [message.channel.id + "turnToPick"])
                                        message.channel.send("Draft completed!")
                                        con.query("UPDATE ?? SET team ='blue' WHERE team = 'blueCapt'", [message.channel.id])
                                        con.query("UPDATE ?? SET team ='red' WHERE team = 'redCapt'", [message.channel.id])
                                        printTeams(message)
                                    }
                                    else {
                                        let draft = con.query("SELECT * FROM ?? WHERE team = ?", [message.channel.id, ''], function (err, r, fields) {
                                            let availableNames = ''
                                            let availableElo = ''

                                            for (var i = 0; i < r.length; i++) {
                                                availableNames = availableNames.concat(r[i].username + '\n')
                                                availableElo = availableElo.concat(r[i].elo + '\n')

                                            }
                                            con.query("SELECT * FROM ?? WHERE team =?", [message.channel.id, 'blueCapt'], (error, bCapt) => {
                                                if (err) throw err;

                                                const draftEmb = new Discord.MessageEmbed()
                                                    .setTitle(bCapt[0].username + ", please draft a player with -draft < @player >")
                                                    .addFields(
                                                        { name: "Players", value: availableNames, inline: true },
                                                        { name: "ELO", value: availableElo, inline: true },
                                                    )
                                                message.channel.send(draftEmb);
                                            })
                                        });
                                    }
                                })

                            }
                        })

                    }
                    else {
                        message.channel.send("Not your turn")
                    }
                })
            }

            else if (data[0].pick == "red") {// reds first pick
                console.log("red1")
                con.query("SELECT * FROM ?? WHERE team = 'redCapt'", [message.channel.id], (error, data) => {
                    if (data.length == 0) {
                        message.channel.send("You cannot pick a player right now!")
                    }
                    else if (message.author.id == data[0].id) {
                        let drafted = getUserFromMention(args[0])

                        con.query("SELECT * FROM ?? WHERE id =?", [message.channel.id, drafted], (error, data) => {

                            if (data.length == 0) {
                                message.channel.send("This is not an available player!")
                            }
                            else if (data[0].team != '') {
                                message.channel.send("This user is already on " + data[0].team + " team!")
                            }
                            else {
                                con.query("UPDATE ?? SET pick = 'red2'", [message.channel.id + "turnToPick"])
                                con.query("UPDATE ?? SET team = 'red' WHERE id = ? ", [message.channel.id, drafted])
                                message.channel.send("Red team picked " + args[0] + "!")

                                con.query("SELECT * FROM ?? WHERE team = ''", [message.channel.id], (error, data) => {
                                    if (data.length == 0) {
                                        con.query("DROP TABLE ??", [message.channel.id + "turnToPick"])
                                        message.channel.send("Draft completed!")
                                        con.query("UPDATE ?? SET team ='blue' WHERE team = 'blueCapt'", [message.channel.id])
                                        con.query("UPDATE ?? SET team ='red' WHERE team = 'redCapt'", [message.channel.id])
                                        printTeams(message)
                                    }
                                    else {
                                        let draft = con.query("SELECT * FROM ?? WHERE team = ?", [message.channel.id, ''], function (err, r, fields) {
                                            let availableNames = ''
                                            let availableElo = ''

                                            for (var i = 0; i < r.length; i++) {
                                                availableNames = availableNames.concat(r[i].username + '\n')
                                                availableElo = availableElo.concat(r[i].elo + '\n')

                                            }
                                            con.query("SELECT * FROM ?? WHERE team =?", [message.channel.id, 'redCapt'], (error, rCapt) => {
                                                if (err) throw err;

                                                const draftEmb = new Discord.MessageEmbed()
                                                    .setTitle(rCapt[0].username + ", please draft a player with -draft < @player >")
                                                    .addFields(
                                                        { name: "Players", value: availableNames, inline: true },
                                                        { name: "ELO", value: availableElo, inline: true },
                                                    )
                                                message.channel.send(draftEmb);
                                            })
                                        });
                                    }
                                })

                            }
                        })

                    }
                    else {
                        message.channel.send("Not your turn")
                    }
                })
            }
            else if (data[0].pick == "blue2") {// blue second pick
                console.log("blue2")
                con.query("SELECT * FROM ?? WHERE team = 'blueCapt'", [message.channel.id], (error, data) => {
                    if (data.length == 0) {
                        message.channel.send("You cannot pick a player right now!")
                    }
                    else if (message.author.id == data[0].id) {
                        let drafted = getUserFromMention(args[0])

                        con.query("SELECT * FROM ?? WHERE id =?", [message.channel.id, drafted], (error, data) => {

                            if (data.length == 0) {
                                message.channel.send("This is not an available player!")
                            }
                            else if (data[0].team != '') {
                                message.channel.send("This user is already on " + data[0].team + " team!")
                            }
                            else {
                                con.query("UPDATE ?? SET pick = 'red'", [message.channel.id + "turnToPick"])
                                con.query("UPDATE ?? SET team = 'blue' WHERE id = ? ", [message.channel.id, drafted])
                                message.channel.send("Red team picked " + args[0] + "!")

                                con.query("SELECT * FROM ?? WHERE team = ''", [message.channel.id], (error, data) => {
                                    if (data.length == 0) {
                                        con.query("DROP TABLE ??", [message.channel.id + "turnToPick"])
                                        message.channel.send("Draft completed!")
                                        con.query("UPDATE ?? SET team ='blue' WHERE team = 'blueCapt'", [message.channel.id])
                                        con.query("UPDATE ?? SET team ='red' WHERE team = 'redCapt'", [message.channel.id])
                                        printTeams(message)
                                    }
                                    else {
                                        let draft = con.query("SELECT * FROM ?? WHERE team = ?", [message.channel.id, ''], function (err, r, fields) {
                                            let availableNames = ''
                                            let availableElo = ''

                                            for (var i = 0; i < r.length; i++) {
                                                availableNames = availableNames.concat(r[i].username + '\n')
                                                availableElo = availableElo.concat(r[i].elo + '\n')

                                            }
                                            con.query("SELECT * FROM ?? WHERE team =?", [message.channel.id, 'redCapt'], (error, rCapt) => {
                                                if (err) throw err;

                                                const draftEmb = new Discord.MessageEmbed()
                                                    .setTitle(rCapt[0].username + ", please draft a player with -draft < @player >")
                                                    .addFields(
                                                        { name: "Players", value: availableNames, inline: true },
                                                        { name: "ELO", value: availableElo, inline: true },
                                                    )
                                                message.channel.send(draftEmb);
                                            })
                                        });
                                    }
                                })

                            }
                        })

                    }
                    else {
                        message.channel.send("Not your turn")
                    }
                })
            }
            else {
                console.log("blue1")
                con.query("SELECT * FROM ?? WHERE team = 'blueCapt'", [message.channel.id], (error, data) => {
                    if (data.length == 0) {
                        message.channel.send("You cannot pick a player right now!")
                    }
                    else if (message.author.id == data[0].id) {
                        let drafted = getUserFromMention(args[0])
                        con.query("SELECT * FROM ?? WHERE id =?", [message.channel.id, drafted], (error, data) => {
                            if (data.length == 0) {
                                message.channel.send("This is not an available player!")
                            }
                            else if (data[0].team != '') {
                                message.channel.send("This user is already on " + data[0].team + " team!")
                            }
                            else {
                                con.query("UPDATE ?? SET pick = 'blue2'", [message.channel.id + "turnToPick"])

                                con.query("UPDATE ?? SET team = 'blue' WHERE id = ? ", [message.channel.id, drafted])
                                message.channel.send("Blue team picked " + args[0] + "!")
                                con.query("SELECT * FROM ?? WHERE team = ''", [message.channel.id], (error, data) => {
                                    if (data.length == 0) {
                                        con.query("DROP TABLE ??", [message.channel.id + "turnToPick"])
                                        message.channel.send("Draft completed!")
                                        con.query("UPDATE ?? SET team ='blue' WHERE team = 'blueCapt'", [message.channel.id])
                                        con.query("UPDATE ?? SET team ='red' WHERE team = 'redCapt'", [message.channel.id])
                                        printTeams(message)
                                    }
                                    else {
                                        let draft = con.query("SELECT * FROM ?? WHERE team = ?", [message.channel.id, ''], function (err, r, fields) {
                                            let availableNames = ''
                                            let availableElo = ''

                                            for (var i = 0; i < r.length; i++) {
                                                availableNames = availableNames.concat(r[i].username + '\n')
                                                availableElo = availableElo.concat(r[i].elo + '\n')
                                            }
                                            con.query("SELECT *FROM ?? WHERE team =?", [message.channel.id, 'redCapt'], (error, rCapt) => {
                                                if (err) throw err;
                                                const draftEmb = new Discord.MessageEmbed()
                                                    .setTitle(rCapt[0].username + ", please draft a player with -draft < @player >")
                                                    .addFields(
                                                        { name: "Players", value: availableNames, inline: true },
                                                        { name: "ELO", value: availableElo, inline: true },
                                                    )
                                                message.channel.send(draftEmb);
                                            })
                                        });
                                    }
                                })

                            }
                        })

                    }
                    else {
                        message.channel.send("Not your turn")
                    }
                })
            }
        })
        function getUserFromMention(mention) {
            const matches = mention.match(/^<@!?(\d+)>$/);

            if (!matches) return;

            const id = matches[1];

            return id;
        }
    },
};