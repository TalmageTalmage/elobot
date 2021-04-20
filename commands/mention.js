
const config = require('../config.json');

module.exports = {
    name: 'mention',
    aliases: ['mention'],
    description: 'posts a link to invite me to another server!',
    execute(message, args) {
        const userArray = message.mentions.users.array();
        message.channel.send(userArray[1].username)
        message.channel.send(userArray[0].username)



    },
};