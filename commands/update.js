const {RichEmbed} = require("discord.js");
const Ch = require("child_process");

module.exports = {
    help : {
        name: 'Update',
        use: "update",
        desk: "Updates all my Discord Bots",
        owner: true
    },
    run : async (m, args) => {
	        let ms = "cd ../\nsh update.sh";
        let reply;
        Ch.exec(ms, (e, out, err) => {
            if(e)return reply = e;
            else return reply = out;
        }).on("close", () => {
            let result = new RichEmbed();
            result.setTitle("Updated");
            result.setColor("e53983");
            result.addField(":outbox_tray: Output", "```js\n"+reply+"```")
            m.channel.send(result)
        })
    }
}