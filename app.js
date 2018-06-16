// Load uthe libraries
const Discord = require("discord.js");
const request = require("request");
const fs = require("fs");

const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");

// Load in mikuru's info
const info = require("./mikuru.json");

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Mikuru-Chan has started.`);
    client.user.setActivity(`with the lolis :3`);
});

client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.


    if (message.author.bot) return;

    // Check to see if the begining of the message has any of the prefixes
    let correctPrefix = config.prefix.indexOf(message.content.toLowerCase().split(" ", 1).toString()) > -1;

    // Ignore any message that does not start with our prefix, 
    if (!correctPrefix) return;

    // Here we separate our "command" name, and our "arguments" for the command. 
    const args = message.content.replace(/[,.!?]/gi, '').slice(message.content.toLowerCase().split(" ", 1).toString().length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    console.log(command + " " + args.join(" "));


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
        message.delete().catch(O_o => {});
        message.channel.send(sayMessage);
        break;

    case "im":
    case "i'm":
        if (args.join(" ").toLowerCase().startsWith("back")) {
            // When the user says a variation of "i'm back" mikuru gives a random response
            var temp = ["Welcome back~ ( ^ω^ )", "Okaerinasai~", "I missed you~"];
            message.channel.startTyping();
            setTimeout(() => {
                message.reply(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2000);
        };
        if (args.join(" ").toLowerCase() === "not feeling good") {
            // When the user says a variation of "i'm not feeling good" mikuru gives a random response
            var temp = ["Will you be fine?", "I'll nurse you back to health.", "Oh, that's no good."];
            message.channel.startTyping();
            setTimeout(() => {
                message.reply(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2000);
        };

        if (args.join(" ").toLowerCase().startsWith("gay")) {
            // When the user says a variation of "i'm gay" mikuru gives a random response
            var temp = ["I love you the way you are. ╰(´︶`)╯♡", "You'll always be the same to me~",
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
        var temp = ["Hiya~", "Hello~", "Hajimemashite~"];    
        message.channel.startTyping();
             setTimeout(() => {
                 message.reply(temp[Math.floor(Math.random() * temp.length)]);
                 message.channel.stopTyping();
             }, 600);
        break;

    case "bye":
        // When the user says a variation of bye Mikuru gives a random response
        var temp = ["Awww, so soon already?", "Sayounara~", "Come back soon~"];    
        message.channel.startTyping();
             setTimeout(() => {
                 message.reply(temp[Math.floor(Math.random() * temp.length)]);
                 message.channel.stopTyping();
             }, 1000);
        break;

    case "how":
         if (args.join(" ").toLowerCase().startsWith("old are you")) {
             // When the user asks "how old are you" mikuru gives a response
             message.channel.startTyping();
             setTimeout(() => {
                 message.channel.send("I'm 16.");
                 message.channel.stopTyping();
             }, 100);
         };

         if (["are you", "are you doing"].includes(args.join(" ").toLowerCase())) {
             // When the user says a variation of "how are you" mikuru tells them how she's feeling
             var temp = [
                 "I'm good, thanks. （⌒▽⌒ゞ", "I'm doing pretty well today.", "Daijoubu.",
                 "I'm feeling a bit better than usual. ໒( ͡ᵔ ▾ ͡ᵔ )७", "I'm good, how are you? （‐＾▽＾‐）",
                 "I'm good, I guess. (^´-｀^)", "I'm feeling under the weather.", "I'm really angry right now. ( ╬◣ 益◢)",
                 "I'm not fine at all. 。・°°・(＞_＜)・°°・。"
             ];
             message.channel.startTyping();
             setTimeout(() => {
                 message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                 message.channel.stopTyping();
             }, 3200);  
         };

         if (args.join(" ").toLowerCase() === "hot am i") {
             // When the user says a variation of "how hot am i" mikuru tells them they are hot
             var temp = ["I would say pretty hot. ♥(ˆ⌣ˆԅ)", "You're hot, I guess.", "Is it me or is it hot in here?"];
             message.channel.startTyping();
             setTimeout(() => {
                 message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                 message.channel.stopTyping();
             }, 3000);
         };

         if (args.join(" ").toLowerCase() === "straight are you") {
            // When the user says a variation of "how straight are you" mikuru gives a random response
            var temp = ["I'm pretty straight.", "I'm not quite sure.", "That's a weird question to ask. >_<"];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2300);
        };
        break;

    case "i":
         if (args.join(" ").toLowerCase() === "love you") {
             // When the user says a variation of "i love you" mikuru gives a random response
             var temp = ["Awwww, thank you~", "I love you too~", "Watashi mo kimi o aishitemasu~"];
             message.channel.startTyping();
             setTimeout(() => {
                 message.reply(temp[Math.floor(Math.random() * temp.length)]);
                 message.channel.stopTyping();
             }, 3000);
         };

         if (args.join(" ").toLowerCase() === "hate you") {
             // When the user says a variation of "i hate you" mikuru gives a random response
             var temp = ["(´；Д；`)", ".°(ಗдಗ。)°.", ";-;"];
             message.channel.startTyping();
             setTimeout(() => {
                 message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                 message.channel.stopTyping();
             }, 1000);
         };

         if (args.join(" ").toLowerCase() === "gtg") {
             // When the user says a variation of "i gtg" mikuru gives a random response
             var temp = ["Itterashai~", ".°(ಗдಗ。)°.", "Don't leave me for too long."];
             message.channel.startTyping();
             setTimeout(() => {
                 message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                 message.channel.stopTyping();
             }, 1000);
         };

         if (args.join(" ").toLowerCase() === "got to go") {
             // When the user says a variation of "i got to go" mikuru gives a random response
             var temp = ["Itterashai~", ".°(ಗдಗ。)°.", "Don't leave me for too long."];
             message.channel.startTyping();
             setTimeout(() => {
                 message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                 message.channel.stopTyping();
             }, 1000);
         };
        break;

    case "what":
         if (args.join(" ").toLowerCase() === "are you doing") {
             // When the user says a variation of "what are you doing" mikuru gives a random response
             var temp = [
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
             }, 3525);
         };

         if (args.join(" ").toLowerCase() === "is your name") {
            // When the user says a variation of "what is your name" mikuru tells them her name
            var temp = ["My full name is Akara Mikuru~"];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2500);
        };

        if (args.join(" ").toLowerCase() === "time is it") {
            // When the user says a variation of "what time is it" mikuru tells them the current time of Japan
            message.channel.startTyping();
            var d = new Date();
            setTimeout(() => {
                message.channel.send("It is " + d.getHours() + ":" + d.getMinutes());
                message.channel.stopTyping();
            }, 1000);
        };

        if (args.join(" ").toLowerCase() === "is your favorite dbangz hit") {
            // When the user says a variation of "what is your favorite dbangz hit" 
            // mikuru can't decide
            var temp = ["Either Way Back When or I Love You.", "But I'm not Mexican~"];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 3000);
        };

        if (args.join(" ").toLowerCase() === "does lmao stand for") {
            // When the user says a variation of "what does lmao stand for" mikuru will tell or not tell them
            var temp = ["Fine... it means laughing my ass off.", "Uh... I think I'll pass on that.", 
            "I'd much rather not say."
        ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 3300);
        };

        if (args.join(" ").toLowerCase() === "is your opinion on bitcoin") {
            // When the user says a variation of "what does lmao stand for" mikuru will tell or not tell them
            var temp = ["Well, I'm not quite sure.", "I don't know, a bad investment?", 
            "I don't really care about those things."
        ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 3000);
        };

        if (args.join(" ").toLowerCase() === "is your opinion on stevens iq") {
            // When the user says a variation of "what is your favorite dbangz hit" 
            // mikuru can't decide
            var temp = ["Err... that's a touchy subject.", "It's a low budget ice cube.", 
            "What kind of question is that?"
        ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2900);
        };

        if (args.join(" ").toLowerCase() === "is your favorite fortnite emote") {
            // When the user says a variation of "what is your favorite fortnite emote" mikuru gives a random response 
            var temp = ["Fresh.", "Orange Justice.", "Jubilation."];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 800);
        };

        if (args.join(" ").toLowerCase() === "the fuck") {
            // When the user says a variation of "what the fuck" mikuru gives a random response 
            var temp = ["Watch the language.", "Don't say that here. (╬⓪益⓪)", "Watch your tongue~"];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 1500);
        };
        break;

    case "where":
        if (args.join(" ").toLowerCase() === "are you") {
            // When the user says a variation of "where are you" mikuru tells them where she lives
            var temp = ["Nichō, Japan.", "In the cloud.", "Wherever you want me to be."];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2000);
        };

        if (args.join(" ").toLowerCase() === "is my head") {
            // When the user says a variation of " where is my head" mikuru fails to understand the joke
            var temp = ["Oh, what happened to it? ｢(ﾟ<ﾟ)ﾞ??", "What? Is that a joke? /(@ﾟﾍﾟ@)", 
            "Uh, it's on your neck. (￣(エ)￣)ゞ"
        ]; 
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2800);
        };

        if (args.join(" ").toLowerCase() === "are your parents") {
            // When the user says a variation of "where are your parents" mikuru tells them how she was created
            var temp = ["I was conceived in Steven's thoughts and made by Parker, I don't have parents~ ♡(ŐωŐ人)"]; 
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 4200);
        };

        if (args.join(" ").toLowerCase() === "is the kush") {
            // When the user says a variation of "where is my kush" mikuru avoids answering the question
            var temp = ["Um...", "Uh...", "I'm sorry?"]; 
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 1000);
        };

        if (args.join(" ").toLowerCase() === "is my kush") {
            // When the user says a variation of "where is my kush" mikuru tells them to change their ways
            var temp = ["Why would I know where you keep your... drugs?", 
            "You really should stop using those kind of things.", "That's not healthy, you know."
        ]; 
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 4000);
        };
        break;
    
    case "do":
         if (args.join(" ").toLowerCase() === "you love me") {
             // When the user says a variation of "do you love me" mikuru tells them she does
             var temp = ["Of course I do. (♥ω♥*)", "I always will~ ໒( ♥ ◡ ♥ )७", "Why wouldn't I? （^´▽｀^）"];
             message.channel.startTyping();
             setTimeout(() => {
                 message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                 message.channel.stopTyping();
             }, 2700);
         };

         if (args.join(" ").toLowerCase() === "you hate me") {
            // When the user says a variation of "do you hate me" mikuru tells them she doesn't
            var temp = ["No, of course not~ ｢(ﾟﾍﾟ)", "Why do you think that? ｢(ﾟ<ﾟ)ﾞ??", "Of course I don't~ Σ(・Д・)!?"];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2500);
        };

        if (args.join(" ").toLowerCase() === "you like cats") {
            // When the user says a variation of "do you like cats" mikuru only loves her tortoise im sorry
            var temp = ["Not sure, I'm allergic to them.", "I already have Bartholomew~ 乂❤‿❤乂",
                "They're okay, I guess."
            ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2800);
        };

        if (args.join(" ").toLowerCase() === "you like dogs") {
            // When the user says a variation of "do you like dogs" mikuru only loves her tortoise im sorry
            var temp = ["I got bit by one, but they're okay.", "I already have Bartholomew~ 乂❤‿❤乂",
                "Some of the puppies are super cute~(●♡∀♡)"
            ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2800);
        };
        break;
        
    case "translate":
        let request = require('request');
        let url = "https://jisho.org/api/v1/search/words?keyword=" + args[0];
        request({
            url: url,
            json: true
        }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            message.channel.startTyping();
            setTimeout(() => {
                let jap = body.data[0].japanese[0];
                let def = body.data[0].senses[0].english_definitions[0];
                message.channel.send("Word: " + jap.word + " Reading: " + jap.reading + " English Definition: " + def);
                message.channel.stopTyping();
            }, 2500);
            }
        });
        break;

    case "kys":
        // When the user says a variation of "kys" mikuru is sad
        var temp = ["But why? ლ(｡-﹏-｡ ლ)", "(ᗒᗩᗕ)՞", "Nooo... why?"]; {
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 1000);
        };
        break;
    
    case "fuck":
        if (args.join(" ").toLowerCase() === "me") {
            // When the user says a variation of "fuck me" mikuru gets angry
            var temp = ["What do you think you're saying?", "Watch yourself please~ (ꐦ°᷄д°᷅)",
            "What were you thinking when you said that?", "Don't say something like that~ (╬ﾟ◥益◤ﾟ) ╬ﾟ"
        ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
        }, 2800);
    };

        if (args.join(" ").toLowerCase() === "you") {
            // When the user says a variation of "fuck you" mikuru gets angry
            var temp = ["You're getting carried away~ <(｀^´)>", "Don't say things like that~",
            "Don't start a fight here~ (๑･`▱´･๑)", "Saying something like that is going to get you in trouble."
        ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
        }, 2800);
    };
    break;

    case "who":
        if (args.join(" ").toLowerCase() === "are you") {
            // When the user says a variation of "who are you" mikuru tells them who she is
            var temp = ["I'm Akara Mikuru~ Hajimemashite. (/^▽^)/"];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
        }, 3200);
    };

        if (args.join(" ").toLowerCase() === "is your senpai") {
            // When the user says a variation of "is your senpai" mikuru tells them they are
            var temp = ["Why, you of course~ (｡♥‿♥｡)"];
            message.channel.startTyping();
            setTimeout(() => {
                message.reply(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
        }, 2000);
    };

        if (args.join(" ").toLowerCase() === "is your waifu") {
            // When the user says a variation of "is your waifu" mikuru gives a random response
            var temp = ["I'll have to decide eventually.", "Ito Otonashi from Aocchi Kocchi~ (￣ω￣)",
            "Kazuma from Konosuba~ (✿´ ꒳ ` )", "Yuuta Togashi from Chūnibyō Demo Koi Ga Shitai~ (￣ω￣;)",
            "Not quite sure right now, actually."
        ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
        }, 3000);
    };
    break;

    case "who's":
        if (args.join(" ").toLowerCase() === "your senpai") {
            // When the user says a variation of "is your senpai" mikuru tells them they are
            var temp = ["Why, you of course~ (｡♥‿♥｡)"];
            message.channel.startTyping();
            setTimeout(() => {
                message.reply(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
        }, 2000);
    };

        if (args.join(" ").toLowerCase() === "your waifu") {
            // When the user says a variation of "who's your waifu" mikuru gives them a random response
            var temp = ["I'll have to decide eventually.", "Ito Otonashi from Aocchi Kocchi~ (￣ω￣)",
            "Kazuma from Konosuba~ (✿´ ꒳ ` )", "Yuuta Togashi from Chūnibyō Demo Koi Ga Shitai~ (￣ω￣;)",
            "Not quite sure right now, actually."
            ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
        }, 3000);
    };
    break;

    case "send":
        if (args.join(" ").toLowerCase() === "nudes") {
            // When the user says a variation of "send nudes" mikuru is disgusted
            var temp = ["I can't believe you just asked me that.", "What did you say?", 
            "https://cdn.discordapp.com/attachments/456789828240015361/457577242487422996/pervert.png"
        ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
        }, 2000);
    };

        if (args.join(" ").toLowerCase() === "memes") {
            // When the user says a variation of "send memes" mikuru is empty handed
            var temp = ["I'm afraid I don't cluster my computer with those.", "I don't have any, and I'm glad.",
            "You can't really expect me to have memes."
            ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
        }, 4000);
    };
    break;

    case "die":
        // When the user says a variation of "die" mikuru becomes sad
        var temp = ["Why are you saying things like that?", "That hurt. A lot. (⌯˃̶᷄ ﹏ ˂̶᷄⌯)ﾟ",
        "Please don't say things like that."
    ]; {
        message.channel.startTyping();
        setTimeout(() => {
            message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
            message.channel.stopTyping();
        }, 3200);
    };
    break;

    case "dab":
        // When the user says a variation of "dab" mikuru becomes confused
        var temp = ["Uh... what?", "Okay...", "???"]; {
        message.channel.startTyping();
        setTimeout(() => {
            message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
            message.channel.stopTyping();
        }, 1000);
    };
    break;

    case "nani":
        // When the user says a variation of "nani" mikuru becomes memelord
        var temp = ["Baka baka baka!!!", "Nanda yo?", "Omae wa mou shindeiru..."]; {
        message.channel.startTyping();
        setTimeout(() => {
            message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
            message.channel.stopTyping();
        }, 1500);
    };
    break;

    case "go":
        if (args.join(" ").toLowerCase() === "die") {
            // When the user says a variation of "go die" mikuru gets angry
            var temp = ["That's mean. (๑◕︵◕๑)", "Excuse me? ⊙︿⊙", "Watch yourself~"];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
        }, 1500);
    };

        if (args.join(" ").toLowerCase() === "kys") {
            // When the user says a variation of "go kys" mikuru gets sad
            var temp = ["But why? ლ(｡-﹏-｡ ლ)", "(ᗒᗩᗕ)՞", "Nooo... why?"]; 
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 1000);
    };

        if (args.join(" ").toLowerCase() === "kill yourself") {
            // When the user says a variation of "go kill yourself" mikuru gets sad
            var temp = ["But why? ლ(｡-﹏-｡ ლ)", "(ᗒᗩᗕ)՞", "Nooo... why?"]; 
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 1000);
    };
    break;

    case "ur":
        if (args.join(" ").toLowerCase() === "gay") {
            // When the user says a variation of "ur gay" mikuru gets angry
            var temp = ["I would appreciate it if you stopped assuming my sexuality.", 
            "In the manner you just said that, it was extremely rude.", 
            "I would be more careful of what you're saying."
        ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
        }, 4000);
    };

        if (args.join(" ").toLowerCase() === "a thot") {
            // When the user says a variation of "ur a thot" mikuru gets sad
            var temp = ["Why would you assume that? ლ(｡-﹏-｡ ლ)", "That's kind of rude.", 
            "Is it something I did?"
        ]; 
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2900);
    };

        if (args.join(" ").toLowerCase() === "bad") {
            // When the user says a variation of "ur bad" mikuru gets sad
            var temp = ["But why? ლ(｡-﹏-｡ ლ)", "(ᗒᗩᗕ)՞", "Um..."]; 
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 1000);
    };
    break;

    case "your":
        if (args.join(" ").toLowerCase() === "gay") {
            // When the user says a variation of "your gay" mikuru gets angry
            var temp = ["I would appreciate it if you stopped assuming my sexuality.", 
            "In the manner you just said that, it was extremely rude.", 
            "I would be more careful of what you're saying."
        ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
        }, 4000);
    };

        if (args.join(" ").toLowerCase() === "a thot") {
            // When the user says a variation of "your a thot" mikuru gets sad
            var temp = ["Why would you assume that? ლ(｡-﹏-｡ ლ)", "That's kind of rude.", 
            "Is it something I did?"
        ]; 
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2900);
    };

        if (args.join(" ").toLowerCase() === "bad") {
            // When the user says a variation of "your bad" mikuru gets sad
            var temp = ["But why? ლ(｡-﹏-｡ ლ)", "(ᗒᗩᗕ)՞", "Um..."]; 
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 1000);
    };
    break;

    case "you're":
        if (args.join(" ").toLowerCase() === "gay") {
            // When the user says a variation of "you're gay" mikuru gets angry
            var temp = ["I would appreciate it if you stopped assuming my sexuality.", 
            "In the manner you just said that, it was extremely rude.", 
            "I would be more careful of what you're saying."
        ];
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
        }, 4000);
    };

        if (args.join(" ").toLowerCase() === "a thot") {
            // When the user says a variation of "you're a thot" mikuru gets sad
            var temp = ["Why would you assume that? ლ(｡-﹏-｡ ლ)", "That's kind of rude.", 
            "Is it something I did?"
        ]; 
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 2900);
    };

        if (args.join(" ").toLowerCase() === "bad") {
            // When the user says a variation of "you're bad" mikuru gets sad
            var temp = ["But why? ლ(｡-﹏-｡ ლ)", "(ᗒᗩᗕ)՞", "Um..."]; 
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(temp[Math.floor(Math.random() * temp.length)]);
                message.channel.stopTyping();
            }, 1000);
    };
    break;

    default:
        break;
    };
});

client.login(config.token);
