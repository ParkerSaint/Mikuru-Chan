 exports.run = (client, message, args) => {    
    // she will send a tts message send a text to speach message
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => {});
    message.channel.send(sayMessage, {
        tts: true
    });
 };
