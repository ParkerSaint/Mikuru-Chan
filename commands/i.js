 exports.run = (client, message, args) => {
    if (args[0].toLowerCase() === "sample") {
        //
        message.channel.startTyping();
        setTimeout(() => {
            // put response here
            message.channel.stopTyping();
        }, 2000);
    };
 };
