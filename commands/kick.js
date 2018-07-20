module.exports = {
    help: {
        name: "Kick",
        use: "Kick [Mention Or ID] *[Reason]",
        description : "Kicks the user",
        perms : ["KICK_MEMBERS"]
    },
    run : (msg, args, Client) => {
        if(!msg.member.hasPermission("KICK_MEMBERS"))return msg.reply("You need the Kick Members permission to use this command");
        if(!msg.guild.members.get(Client.user.id).hasPermission("KICK_MEMBERS"))return msg.reply("I need the Kick Members Permission to be able to use this command");
        if(msg.mentions.members.size > 0){
            console.log(msg.mentions.members.first().user.username);
            if(msg.mentions.members.size > 1)return msg.reply("Please only mention one user at a time");
            else if(compareRoles(msg, msg.mentions.members.first())){
                let reason = '';
                if(args.length >= 2)reason = args[1];
                msg.mentions.members.first().kick(reason);
            }
        }else{
            console.log(msg.guild.members.get(args[0]).user.username)
            if(args.length < 1)return msg.reply("Please enter a id to kick");
            if(!msg.guild.members.has(args[0]))return msg.reply("The Id has to belong to a User on this server");
            if(compareRoles(msg, msg.guild.members.get(args[0]))){
                let reason = '';
                if(args.length >= 2)reason = args[1];
                msg, msg.guild.members.get(args[0]).kick(reason);
            }
        }
    }
}

function compareRoles(m, o){
    return m.guild.members.get(m.author.id).highestRole.comparePositionTo(o.highestRole) > 0;
}