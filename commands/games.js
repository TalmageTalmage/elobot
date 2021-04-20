const con = require("../connection")
const config = require('../config.json');
const prettyTable = require('prettytable')

module.exports = {
    name: 'games',
    aliases: ['g'],
    description: 'Displays list of games available in this server!',
    execute(message, args) {
        con.query("SELECT * FROM games WHERE guildID = ?", [message.guild.id], (error, data) => {
            let rows = []
            for (var i = 0; i < data.length; i++) {
                let games = [data[i].gameType, data[i].lobbySize, data[i].captType]
                rows.push(games)
            }
            //creates a table and orders it by ELO
            leaderTable = new PrettyTable()
            var headers = ["Game", "Lobby Size", "Captain Type"]
            leaderTable.create(headers, rows)
            leaderTable.sortTable("ELO", reverse = true)
            var tableContent = leaderTable.toString();
            //sends leaderboard to current channel inside of a codeblock
            message.channel.send("```" + tableContent + "```")
        })

    },
};