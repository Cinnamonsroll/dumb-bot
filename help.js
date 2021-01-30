module.exports.run = async ctx => {
let categories = []
ctx.client.commands.map(cmd => categories.includes(cmd.help.category) ? "" : categories.push(cmd.help.category))
let cat2  = categories.sort(function(a,b){
    return a.localeCompare(b)
})
let stringTools = new (require("string-toolkit"))()
let query = ctx.args[0]
if(query && ctx.client.commands.get(query) || ctx.client.commands.get(ctx.client.aliases.get(query))){
let command = ctx.client.commands.get(query) || ctx.client.commands.get(ctx.client.aliases.get(query))
let embed = new ctx.Discord.MessageEmbed()
.setColor(ctx.client.color)
.setAuthor("Help", ctx.client.user.avatarURL({format: "png"}))
.addField("Command", stringTools.toProperCase(command.help.name))
.addField("Category", stringTools.toProperCase(command.help.category))
.addField("Description", stringTools.toProperCase(command.help.description))
.addField("Usage", stringTools.toProperCase(command.help.usage) || "None")
.addField("Aliases", command.help.aliases.map(t => `\`${stringTools.toProperCase(t)}\``).join(" | "))
ctx.commandFunctions.sendMessage(ctx, embed)

}else if(query && categories.includes(query.toLowerCase()) || (parseInt(query) > 0 && parseInt(query) <= cat2.length)){
let cat = isNaN(parseInt(query)) ? categories[parseInt(categories.indexOf(query.toLowerCase()))] : categories[parseInt(query - 1)]

let embed = new ctx.Discord.MessageEmbed()
.setColor(ctx.client.color)
.setAuthor("Help", ctx.client.user.avatarURL({format: "png"}))
.addField("Category", stringTools.toProperCase(cat))
.addField("Commands", ctx.client.commands.filter(cmd => cmd.help.category.toLowerCase() === cat).map(cmd => `\`${stringTools.toProperCase(cmd.help.name)}\``).join(" | "))
ctx.commandFunctions.sendMessage(ctx, embed)
}else{
    const { default: didYouMean, ReturnTypeEnums} = require("didyoumean2")

let embed = new ctx.Discord.MessageEmbed()
.setColor(ctx.client.color)
.setAuthor("Help", ctx.client.user.avatarURL({format: "png"}))
.addField("Categories", `${categories.map((cat, i) => `${stringTools.toProperCase(cat)} - \`${i + 1}\``).join("\n")}`)
ctx.commandFunctions.sendMessage(ctx, embed)
}
}
module.exports.help = {
    name: "help",
    owner: false,
    description: "Sends help embed",
    usage: "[category id|command name|category name]",
    aliases: ["h"],
    category: "general"
}