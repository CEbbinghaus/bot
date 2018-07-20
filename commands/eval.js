const {
    RichEmbed
} = require("discord.js");
module.exports = {
    help: {
        name: "Eval",
        use: 'eval {code to eval}',
        desk: "Evaluates JS",
        owner: true
    },
    run: async (m, args) => {
        let ms = args.join(" ");
        let res;
        let type;
        try {
            res = eval(ms)
            await res;
            type = typeof res;
        } catch (err) {
            res = err.toString()
            type = "Error";
        }
        if (typeof res !== "string") res = require("util").inspect(res);
        if (res == "Infinity") res = "∞";
        res = await clean(res);
        let result = new RichEmbed();
        result.title = "Evaluated";
        result.setColor("53e8a2");
        result.addField(":inbox_tray: Input", "```\n" + ms + "```");
        result.addField(":outbox_tray: Output", "```js\n" + res + "```")
        result.addField(":clipboard: Type", `\`\`\`js\n${type}\`\`\``)
        m.channel.send(result);
    }
}



async function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}