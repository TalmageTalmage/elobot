const con = require("../connection")

module.exports = {
    name: 'addgame',
    description: 'addgame <gamename> <total lobby size> if gamename is multiple words it must be put in quotations',
    aliases: ['add'],

    execute(message, args) {


        if (args.length != 3) {
            message.channel.send("Please put the game name first and then the lobby size afterwards followed by the captain type ('rating' or 'nomination').")
            return
        }
        else if (args[1] <= 3) {
            message.channel.send("Minimum lobby size is 4!")
        }
        else if (isEven(args[1])) {
            con.query("SELECT * FROM games WHERE gameType = ? AND guildID = ? ", [args[0], message.guild.id], (error, data) => {
                if (error) {
                    console.log(error)
                }
                else if (data.length == 0) {
                    if (args[2] === "rating" || args[2] == "nomination") {
                        con.query("INSERT INTO games SET ?", [{ gameType: args[0], lobbySize: args[1], captType: args[2], guildID: message.guild.id }], (error, data) => {
                            if (error) {
                                message.channel.send("Please put the game name first and then the lobby size afterwards.")
                            }
                            else {
                                message.channel.send("Game added!")
                            }
                        })
                    }
                    else {
                        message.channel.send("Please set your captain type ('rating' or 'nomination' and try again!")
                    }
                }
                else {
                    message.channel.send("This game mode is already available in this server!")
                }
            })
        }
        else {
            message.channel.send("Must be an even number!")
        }
    },
};


function isEven(value) {
    if (value % 2 == 0)
        return true;
    else
        return false;
}