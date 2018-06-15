 exports.run = (client, message, args) => {
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
        let temp = ["(´；Д；`)", ".°(ಗдಗ。)°.", "*Crying*"];
        message.channel.startTyping();
        setTimeout(() => {
            message.reply(temp[Math.floor(Math.random() * temp.length)]);
            message.channel.stopTyping();
        }, 1000);
    };
 };
