exports.run = (client, message, args) => {
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
            "I'm good, I guess. (*´-｀*)", "I'm feeling under the weather.", "I'm really angry right now. ( ╬◣ 益◢)",
            "I'm not fine at all. 。・°°・(＞_＜)・°°・。"
        ];
        message.channel.startTyping();
        setTimeout(() => {
            message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
            message.channel.stopTyping();
        }, 3500);
    };
};
