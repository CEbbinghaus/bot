const settings = require("./settings.json");
const {HelpReact, HandleMessage, DBManager} = require("./util/util.js");
const {Client, Attachment} = require("discord.js");
const fetch = require("node-fetch");
const Bot = new Client();
var Timer = null;
Bot.on("ready", async () => {
  console.log(`${Bot.user.username} is now Online on ${Bot.guilds.size} Servers for a total of ${Bot.users.size} users`)
})
// process.on("unhandledRejection", console.error);
Bot.on("message", m => HandleMessage(m, Bot));
Bot.on("messageUpdate", (om, nm) => HandleMessage(nm, Bot));
Bot.login(settings.token)