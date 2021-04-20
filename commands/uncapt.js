const con = require("../connection")
const lobbyCheck = require('../functions/lobbyCheck')

module.exports = {
    name: 'uncapt',
    description: 'Removes your self nomination for captain',
    execute(message, args) {
        con.query("SELECT * FROM ?? WHERE id = ?", [message.channel.id, message.author.id], (error, data) => {
            console.log(data)
            if (error) {
                message.channel.send("There is no lobby in this channel!")
            }
            else if (data[0].capt === 0) {
                message.channel.send("You have not nominated yourself")
            }
            else if (data[0].capt === 1) {
                con.query("UPDATE ?? SET capt = false WHERE id = ?", [message.channel.id, message.author.id], (error, data) => {
                    message.channel.send("Your self nomination has been removed!")
                    lobbyCheck(message)

                })
            }

        })

    },
};