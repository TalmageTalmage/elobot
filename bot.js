
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
// const con = require('./connection');
const addServer = require('./functions/addServer');
const con = require('./connection');


const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));



for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on("ready", () => {
    // con.query("SELECT * FROM servers", (error, data) => {
    //     client.user.setPresence({ watching: { name: 'with ' + data.length + " servers!" }, status: 'online' })

    // })
})

client.on('error', console.error);



client.on('message', message => {
    con.query("SELECT * FROM guilds WHERE guildID = ?", message.guild.id, (error, data) => {
        if (data.length == 0) {
            addServer(message)
        }
    })
    if (!message.content.startsWith(prefix) || message.author.bot) return;


    client.user.setPresence({ activity: { name: "type -help for help!" }, status: 'online' })



    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(token);