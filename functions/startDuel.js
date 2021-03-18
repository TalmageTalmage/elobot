const con = require("../connection")
const Discord = require('discord.js');
const config = require('../config.json')



let startDuel = (message) => {
    message.channel.send("Duel ready! Report the score when done!")

}

module.exports = startDuel