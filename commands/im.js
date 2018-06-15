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
   if (args[0].toLowerCase() === "gay") {
        // When the user says a variation of "I'm gay" mikuru gives a random response
        let temp = ["I love you the way you are. ╰(´︶`)╯♡", "You'll always be the same to me~", "That doesn't change my view of you."];
        message.channel.startTyping();
        setTimeout(() => {
            message.reply(temp[Math.floor(Math.random() * temp.length)]);
            message.channel.stopTyping();
        }, 4000);
    };
 }; 
 