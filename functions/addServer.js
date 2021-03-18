const con = require("../connection")



let lobbyCheck = (message) => {

    con.query("INSERT INTO servers SET ?", [{ id: message.guild.id }])

}

module.exports = lobbyCheck