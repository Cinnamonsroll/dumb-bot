module.exports = async (client, message) => {
    let Discord = require("discord.js")
    let prefix = 't.'
    
    if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return
    let ctx = {
        message: message,
        Discord: Discord,
        client: client,
        args: message.content.slice(prefix.toLowerCase().length).trim().split(/ +/g),
        flags: new (require("string-toolkit"))().parseOptions(message.content.split(" ")).flags,
        getAllTextFromEmbed: require("../functions/commands.js").getAllTextFromEmbed,
        commandFunctions: require("../functions/commands.js")
    }
    let cmd = ctx.args.shift().toLowerCase()
    let command;
    if(ctx.client.commands.has(cmd)){
        command = ctx.client.commands.get(cmd)
    }else if(ctx.client.aliases.has(cmd)){
        command = ctx.client.commands.get(ctx.client.aliases.get(cmd))
    }
    if(command){
    if(command.help.owner === true && !ctx.client.owners.includes(ctx.message.author.id)){
        return ctx.message.channel.send("Owner command only")
    }else{
        command.run(ctx)
    }
    }
}