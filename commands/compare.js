

const con = require("../connection")

module.exports = {
    name: 'compare',
    aliases: ['c'],
    description: 'compares 2 players winrates vs eachother. -compare <gamemode> <@player1> <@player2>',
    execute(message, args) {
        const userArray = message.mentions.users.array();
        con.query("SELECT * FROM games WHERE guildID = ? AND gameType = ?", [message.guild.id, args[0]], (error, game) => {


            if (args.length != 3) {
                message.channel.send("You need a game to compare!")
            }
            else if (game.length == 0) {
                message.channel.send("This is not a game mode!")
            }

            else {
                const user1 = getUserFromMention(args[1])
                const user2 = getUserFromMention(args[2])

                con.query("SELECT * FROM compare WHERE player1 = ? AND player2 = ? AND guildID = ? AND gameType = ?", [user1, user2, message.guild.id, args[0]], (error, data) => {
                    if (data.length == 0) {
                        message.channel.send("These 2 players have not played this game together yet!")
                    }
                    else {
                        message.channel.send(userArray[0].username + " has beaten " + userArray[1].username + " " + data[0].winsAgainst + " times in " + args[0] + "! " + userArray[0].username + " has been beaten by " + userArray[1].username + " " + data[0].lossesAgainst + " times. " +
                            userArray[0].username + " and " + userArray[1].username + " have won together " + data[0].winsWith + " times and lost together " + data[0].lossesWith + " times. The current ELO differential is " + data[0].ELODiff)
                    }
                })


                function getUserFromMention(mention) {
                    const matches = mention.match(/^<@!?(\d+)>$/);

                    if (!matches) return;

                    const id = matches[1];

                    return id;
                }
                console.log(user1)
                console.log(user2)
                con.query("SELECT * FROM games WHERE guildID = ? AND gameType = ?", [message.guild.id, args[0]], (error, data) => {
                    console.log(data)
                })
            }
        })
    },

};