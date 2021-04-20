const con = require("../connection")
const lobbyCheck = require('../functions/lobbyCheck')

module.exports = {
    name: 'capt',
    aliases: ['captain', 'capt'],

    description: 'Nominates yourself as a captain the lobby',
    execute(message, args) {
        con.query("SELECT * FROM ?? WHERE id = ?", [message.channel.id, message.author.id], (error, data) => {
            if (error) {
                message.channel.send("There is no lobby in this channel!")
            }
            else if (data[0].capt === 1) {
                message.channel.send("You already nominated yourself as captain!")
            }
            else if (data[0].capt === 0) {
                con.query("UPDATE ?? SET capt = true WHERE id = ?", [message.channel.id, message.author.id], (error, data) => {
                    message.channel.send("You have nominated yourself as captain!")
                    lobbyCheck(message)

                })
            }

        })

    },
};