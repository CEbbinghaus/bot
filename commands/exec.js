const {
    RichEmbed
} = require("discord.js");
const Ch = require("child_process");

module.exports = {
    help: {
        name: "Exec",
        use: 'exec {commands}',
        desk: "Executes Bash on my server",
        owner: true
    },
    run: async (m, args) => {
        let ms = args.join(" ");
        let reply;
        Ch.exec("cd ../\n" + ms, (e, out, err) => {
            if (e) return reply = e;
            else return reply = out;
        }).on("close", () => {
            let result = new RichEmbed();
            result.setTitle("Executed");
            result.setColor("e53983");
            result.addField(":inbox_tray: Input", "```bash\n" + ms + "```");
            result.addField(":outbox_tray: Output", "```js\n" + reply + "```")
            m.channel.send(result)
        })
    }
}