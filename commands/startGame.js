const con = require("../connection")




module.exports = {
    name: 'startgame',
    description: 'starts a lobby in this channel, only one lobby per channel at a time',
    aliases: ['s', 'start'],

    execute(message, args) {
        con.query("SELECT * FROM lobbies WHERE id = ?", [message.channel.id], (error, data) => {
            if (data.length == 0) {
                con.query("SELECT * FROM games WHERE gameType= ? AND guildID =? ", [args[0], message.guild.id], (error, data) => {
                    if (data.length == 0) {
                        message.channel.send("This is not an available game mode! Use the addGame command to add it!")
                    }
                    else {
                        con.query("INSERT INTO lobbies set ?", [{ id: message.channel.id, gameType: args[0], lobbySize: data[0].lobbySize, guildID: message.guild.id }], (error, data) => {
                            con.query("CREATE TABLE ??(id VARCHAR(30), username VARCHAR(30), elo INT, team VARCHAR(30), PRIMARY KEY (id))", [message.channel.id], (error, data) => {
                                if (error) throw error
                                message.channel.send("Lobby created! Use join to join!")
                            })
                        })
                    }
                })
            }
            else {
                message.channel.send("There is already an ongoing lobby in this channel!")
            }

        })

    },
};