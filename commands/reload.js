let fs = require("fs");
module.exports = {
  help: {
    name: "Reload",
    desk: "Reloads All Commands",
    owner: true
  },
  run: async (m, a) => {
    let r = await m.channel.send("🔄 **Reloading...**")
    fs.readdirSync("./commands/").forEach(v => {
      delete require.cache[require.resolve(`./${v}`)];
    })
    r.edit("✅ **Done!**");
  }
}