const con = require("../connection")
const print = require("../functions/printLobby")




module.exports = {
    name: 'seed2',
    description: 'Displays the lobby in this channel',

    execute(message, args) {
        con.query('INSERT INTO ?? SET ?', [message.channel.id + "scores", { id: '163328848233103360', redScore: 4, blueScore: 6 }])
        con.query('INSERT INTO ?? SET ?', [message.channel.id + "scores", { id: '735722066371936287', redScore: 4, blueScore: 6 }])
        con.query('INSERT INTO ?? SET ?', [message.channel.id + "scores", { id: '224636257500790786', redScore: 4, blueScore: 6 }])



    },
};