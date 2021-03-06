const con = require("../connection")




module.exports = {
    name: 'startgame',
    description: 'starts a lobby in this channel, only one lobby per channel at a time',
    aliases: ['s', 'start'],

    execute(message, args) {
        con.query("SELECT * FROM lobbies WHERE id = ?", [message.channel.id], (error, data) => {
            if (data.length == 0) {
                con.query("SELECT * FROM games WHERE gameType = ? AND guildID = ? ", [args[0], message.guild.id], (error, data) => {
                    console.log(data)
                    if (data.length == 0) {
                        message.channel.send("This is not an available game mode! Use the addGame command to add it!")
                    }
                    else {
                        con.query("INSERT INTO openLobbies set ?", [{ channelID: message.channel.id, gameType: args[0], lobbySize: data[0].lobbySize, guildID: message.guild.id, captType: data[0].captType }], (error, data) => {
                            if (error) throw error
                            con.query("CREATE TABLE ??(id VARCHAR(30), username VARCHAR(30), elo INT, capt BOOLEAN, team VARCHAR(30), PRIMARY KEY (id))", [message.channel.id], (error, data) => {
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