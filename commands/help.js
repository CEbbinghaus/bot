const fs = require("fs");
const {RichEmbed} = require("discord.js");
const {CheckPerms} = require("../util/util")

module.exports = {
    help : {
       name: "Help",
       desk: "Gives you a Helping hand"
    },
    run : (m) => {
        let commandsList = fs.readdirSync('./commands/');
        let commands = [];
        commandsList.forEach(c => commands.push(c));
        let reply = new RichEmbed();
        reply.setTitle("Help:");
        reply.setColor("1575a5");
        commands.forEach(cn => {
            let c = require("./" + cn)
            if(c.help && CheckPerms(c.help, m)){
                reply.addField(c.help.name, c.help.desk);
            }
        })
        m.channel.send(reply);
    }
}