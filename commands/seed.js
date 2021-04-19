const con = require("../connection")
const print = require("../functions/printLobby")




module.exports = {
    name: 'seed',
    description: 'Displays the lobby in this channel',

    execute(message, args) {
        con.query('INSERT INTO ?? SET ?', [message.channel.id, { id: '163328848233103360', username: "Teriyaki", elo: 1000, team: "" }])
        con.query('INSERT INTO ?? SET ?', [message.channel.id, { id: '735722066371936287', username: "Tal2", elo: 1000, team: "" }])
        con.query('INSERT INTO ?? SET ?', [message.channel.id, { id: '224636257500790786', username: "kgz", elo: 1000, team: "" }])
        con.query('INSERT INTO ?? SET ?', [message.channel.id, { id: '311648497969528834', username: "Nick", elo: 1000, team: "" }])



    },
};