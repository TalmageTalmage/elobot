const con = require("../connection")



let addServer = (message) => {

    con.query("INSERT INTO guilds SET ?", [{ guildID: message.guild.id, guildName: message.guild.name }])

}

module.exports = addServer