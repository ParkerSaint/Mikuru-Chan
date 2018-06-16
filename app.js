// Load up the libraries
const Discord = require("discord.js");
const request = require("request");
const fs = require("fs");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Mikuru-Chan has started.`);
    client.user.setActivity(`Somthing Normal`);
});

client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;

    // Also good practice to ignore any message that does not start with our prefix, 
    // which is set in the configuration file.
    if (message.content.toLowerCase().indexOf(config.prefix) !== 0) return;

    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    switch (command) {
    case "ping":
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
        break;

    case "say":
        // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
        // To get the "message" itself we join the `args` back into a string with spaces: 
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(O_o => {});
        // And we get the bot to say the thing: 
        message.channel.send(sayMessage);
        break;

    case "im":
    case "i'm":
        if (args[0].toLowerCase() === "back") {
            // When the user says a variation of "I'm back" mikuru gives a random response
            let temp = ["Welcome back~ ( ^ω^ )", "Okaerinasai~", "I missed you~"];
            message.channel.startTyping();
            setTimeout(() => {
                message.reply(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2000);
        };
        if (args.join(" ").toLowerCase() === "not feeling good") {
            // When the user says a variation of "I'm back" mikuru gives a random response
            let temp = ["Will you be fine?", "I'll nurse you back to health.", "Oh, that's no good."];
            message.channel.startTyping();
            setTimeout(() => {
                message.reply(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2000);
        };

        if (args[0].toLowerCase() === "gay") {
            // When the user says a variation of "I'm gay" mikuru gives a random response
            let temp = ["I love you the way you are. ╰(´︶`)╯♡", "You'll always be the same to me~",
                "That doesn't change my view of you."
            ];
            message.channel.startTyping();
            setTimeout(() => {
                message.reply(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 3000);
        };
        break;

    case "hello":
        // When the user says a variation of hello Mikuru gives a random response
        let temp = ["Hiya!", "Hello!", "ohayou, konnichiwa, konbanwa"]; // These are the three time of day based responses.   
        message.reply(temp[Math.floor(Math.random() * temp.length)]);
        break;

    case "how":
         if (args.join(" ").toLowerCase() === "old are you") {
             // When the user asks "how old are you" mikuru gives a response
             message.channel.startTyping();
             setTimeout(() => {
                 message.channel.send("I'm 16.");
                 message.channel.stopTyping();
             }, 1200);
         };

         if (args.join(" ").toLowerCase() === "are you") {
             // When the user says a variation of "love you" mikuru gives a random response
             let temp = [
                 "I'm good, thanks. （⌒▽⌒ゞ", "I'm doing pretty well today.", "Daijoubu.",
                 "I'm feeling a bit better than usual. ໒( ͡ᵔ ▾ ͡ᵔ )७", "I'm good, how are you? （‐＾▽＾‐）",
                 "I'm good, I guess. (^´-｀^)", "I'm feeling under the weather.", "I'm really angry right now. ( ╬◣ 益◢)",
                 "I'm not fine at all. 。・°°・(＞_＜)・°°・。"
             ];
             message.channel.startTyping();
             setTimeout(() => {
                 message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                 message.channel.stopTyping();
             }, 3500);
         };
         break;

    case "i":
         if (args.join(" ").toLowerCase() === "love you") {
             // When the user says a variation of "love you" mikuru gives a random response
             let temp = ["Awwww, thank you~", "I love you too~", "Watashi mo kimi o aishitemasu~"];
             message.channel.startTyping();
             setTimeout(() => {
                 message.reply(temp[Math.floor(Math.random() * temp.length)]);
                 message.channel.stopTyping();
             }, 3000);
         };

         if (args.join(" ").toLowerCase() === "hate you") {
             // When the user says a variation of "hate you" mikuru gives a random response
             let temp = ["(´；Д；`)", ".°(ಗдಗ。)°.", ";-;"];
             message.channel.startTyping();
             setTimeout(() => {
                 message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                 message.channel.stopTyping();
             }, 1000);
         };
         break;

    case "sample message":
         // do thing
         break;

    case "what":
         if (args.join(" ").toLowerCase() === "are you doing") {
             // When the user says a variation of "are you doing" mikuru gives a random response
             let temp = [
                 "I'm knitting a scarf for myself right now. (๑•̀ㅂ•́)و", "Talking to you, dummy~ (￣ω￣)",
                 "I'm watching Kokoro Connect.", "I'm watching Haganai.", "I'm watching SAO. I know, it's bad. (ツ)_/¯",
                 "I'm watching Darling in the Franxx.", "I'm watching Angel Beats. ( ≧Д≦)",
                 "I'm watching Blade Dance~", "I'm watching the Asterisk War.", "I'm listening to some music.", 
                 "I'm reading a book~", "I ***was*** taking a nap. (；￣Д￣）", "I'm doing homework.",
                 "I was doodling in my sketchbook.", "I was texting my friends. (＾▽＾)", "I was doing some chores.",
                 "Playing with my tortoise. (*＾▽＾)／", "Playing with Bartholomew. (*＾▽＾)／", "Oh~ I was just daydreaming.",
                 "I'm doing my hair~", "I was watching a movie.", "Oh me? Just wasting the day away."
             ];
             message.channel.startTyping();
             setTimeout(() => {
                 message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                 message.channel.stopTyping();
             }, 3500);
         };

         if (args.join(" ").toLowerCase() === "is your name") {
            // When the user says a variation of "is your name" mikuru tells them her name
            let temp = ["My full name is Akara Mikuru~"];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 3500);
        };

        if (args.join(" ").toLowerCase() === "time is it") {
            // When the user says a variation of "time is it" mikuru tells them the current time of Japan
            let temp = ["It's high noon. >_>"];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 3500);
        };
         break;
    default:
        break;
    };
});

client.login(config.token);
