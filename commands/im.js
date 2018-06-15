 exports.run = (client, message, args) => {
   if (args[0].toLowerCase() === "back") {
        // When the user says a variation of "I'm back" mikuru gives a random response
        let temp = ["Welcome back~ ( ^ω^ )", "Okaerinasai~", "I missed you~"];
        message.channel.startTyping();
        setTimeout(() => {
            message.reply(temp[Math.floor(Math.random() * temp.length)]);
            message.channel.stopTyping();
        }, 2000);
    };
 };
