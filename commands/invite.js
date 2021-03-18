

const con = require("../connection")
const config = require('../config.json');

module.exports = {
    name: 'inv',
    aliases: ['invite'],
    description: 'posts a link to invite me to another server!',
    execute(message, args) {
        message.channel.send("https://discord.com/api/oauth2/authorize?client_id=735001265658134598&permissions=201526272&scope=bot")
    },
};