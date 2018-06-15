 exports.run = (client, message, args) => {
    // When the user says a variation of hello Mikuru gives a random response
    let temp = ["Hiya!", "Hello!", "ohayou, konnichiwa, konbanwa"]; // These are the three time of day based responses.   
    message.reply(temp[Math.floor(Math.random() * temp.length)]);
 };
 