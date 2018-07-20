const settings = require("../settings.json");
const sql = require("sequelize");

let HelpReact = async (m, r) => {
  await m.react("❌");
  m.react("❓");
  let c = m.createReactionCollector((reac, usr) => reac.emoji.name == "❓" && usr.id == m.author.id, {
    time: 6e4*5
  })
  c.on("collect", () => {m.reply(r);c.stop()});
  c.on("end", () => {m.clearReactions()})
}
module.exports.HelpReact = HelpReact;


CheckPerms = (h, m) => {
  if(m.author.id == settings.owner)return true;
  if(!h.owner && m.member.hasPermission(h.perms || []))return true;
  if(h.owner)return;
  HelpReact(m, "Invalid Permissions");
}
module.exports.CheckPerms = CheckPerms

HandleMessage = async (m, b) => {
  if (m.author.bot) return;
  let P = settings.prefix;
  let isMentioned = m.mentions.users.size ? m.mentions.users.first().id == m.guild.me.user.id : false;
  if (!(m.content.startsWith(P) || isMentioned))return;
  let a = (isMentioned ? m.content.replace(/<@\d{18}>/, "").trim() : m.content.slice(P.length)).split(" ");
  try {
    let c = require(`../commands/${a[0].toLowerCase()}.js`);
    if(CheckPerms(c.help, m)){
      c.run(m, a, b)
    }
  } catch (err) {
    console.error(err.stack);
    if (m.author.id == settings.owner){
      HelpReact(m, err.toString())
    }else
    HelpReact(m, `${a[0]} is not a Valid Command`)
  }
}
module.exports.HandleMessage = HandleMessage

// module.exports.DBManager = class dbManager {
//   constructor(){
//     let file = new sql('database', 'username', 'password', {
//       dialect: 'sqlite',
//       storage: './db/servers.sqlite'
//     });
//     this.db = file.define("Servers", {
//       id: {type: sql.STRING, primaryKey: true},
//       data: sql.TEXT
//     }, {
//       timestamps: false
//     })
//     this.servers = null;
//     this.Init();
//   }
//   Init(){
//     this.db.sync();
//     this.loadServers();
//   }
//   async loadServers(){
//     this.servers = await this.db.findAll();
//   }
//   async syncServers(g){
//     let p = [];
//     g.forEach(go => {
//       p.push(
//         this.db.findOrCreate({
//             where: {
//               [sql.Op]: {
//                 id: go.id
//               }, 
//               defaults:{
//                 id: go.id,
//                 data: `{"prefix" : "//"}`
//               }
//           }
//         })
//       );
//     })
//     await Promise.all(p);
//     this.db.findAll().then(s => {
//       if(!g.has(s.id)){
//         this.db.destroy({where: {id: s.id}});
//       }
//     })
//   }
//   saveServer(id, o){
//     this.db.update({data: o}, {where: {id: id}})
//   }
//   async requestServer(id){
//     if(this.servers.indexOf(id) != -1)
//     return this.servers[this.servers.indexOf(id)];
//     let s = await this.db.findOne(id);
//     console.log(s);
//     if(!s)return false;
//     else return s;
//   }
// }