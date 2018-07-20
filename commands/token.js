const {Client} = require("discord.js");
const settings = require('../settings.json');
module.exports = {
    help: {
        name: "BotTest",
        use: "botTest [Bot Token]",
        desk: "Allows you to test a Bot Token",
        description : "Checks if a Bot is active"
    },
    run : (m, args, Bot, mnm, s) => {
        //checks for a token
        if(!args[0])return m.reply("please provide a token");
        //checks if a token is valid
        let token = /(\S{59})/.exec(m.content);
        //
        if(!token)return m.reply("that isnt a vald token");
        token = token[0]
        m.channel.send("Connecting to the discord Servers").then(mes => {
            let b = new Client();

            b.on("ready",async () => {
                let members = 0;
                await b.guilds.forEach(async g => {
                    console.log(g);
                    g.channels.random().createInvite()
                    .then(i => {
                        let pe = [];
                        mes.channel.send(`**${g.name}**: ${i.url}\n`, {split: true});
                        settings.permissions.forEach(p => {
                            pe.push(p + ' : ' + g.me.hasPermission(p))
                        })
                        mes.channel.send("```" + pe.join("\n") + '```', {split: true})
                    });
                })
            })
            b.login(token)
            .catch(() => {mes.edit("sorry it doesnt work");})
            .then(() => {mes.edit("Yuss we have a valid token. user is: " + b.user.username);})
        })
    }
}