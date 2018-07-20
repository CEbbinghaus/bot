module.exports = {
    help: {
        nane: "Delete",
        use: "delete [message id]",
        description : "Deletes a message",
        perms : ["MANAGE_MESSAGES"]
    },
    run : (m, args, Bot, orgs) => {
        if(!m.guild.members.get(Bot.user.id).hasPermission("MANAGE_MESSAGES"))return m.reply("I need the Mange Messages Permission to Delete Messages");
        if(!m.member.hasPermission("MANAGE_MESSAGES"))return m.reply("You need to have the Manage Messages Permission to Delete Messages")
        if(args.length < 1)return m.reply("You Need to add a Message id");
        console.log(m.channel.messages.get(args[0]))
    }
}
