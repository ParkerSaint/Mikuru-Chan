// Load up the libraries
const Discord = require("discord.js");
const fs = require("fs");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        // super-secret recipe to call events with all their proper arguments *after* the `client` var.
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});


client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    if (message.author.bot) return;
    // This will prevent the bot from responding to itself or otherbots

    // Also good practice to ignore any message that does not start with our prefix, 
    // which is set in the configuration file.
    if (message.content.toLowerCase().indexOf(config.prefix) !== 0) return;

 
    var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();
     // Here we separate our "command" name, and our "arguments" for the command.

    var messageTrimmed = message.content.slice(config.prefix.length).trim();
     // messageTrimmed takes the original message.content, and removes the prefix
    console.log(messageTrimmed); // logs the message sent in the console
    
    try {
        let commandFile = require(`./commands/${command.replace(/[^a-zA-Z ]/g, "").toLowerCase()}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
});

client.login(config.token);
