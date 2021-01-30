module.exports.run = async ctx => {
let moment = require("moment")
await ctx.message.guild.members.fetch({
    withPresences: true
})
let members = ctx.message.guild.members.cache.sort((b,a) => b.joinedTimestamp - a.joinedTimestamp)
let joins = members.array()
let jpMention = ctx.message.mentions.members.first() || ctx.message.guild.members.cache.get(ctx.args[0]) || ctx.message.member
let mainIndex = members.array().findIndex(m => m.user.id === jpMention.user.id)
let embeds = members.array().map((m,c) => 
c === mainIndex ? `**#${c + 1} ${ctx.Discord.Util.escapeMarkdown(m.user.tag)} \`(${m.user.bot ? "BOT" : "USER"})\` (${moment.utc(m.joinedAt).fromNow()}) <--**` : `#${c + 1} ${ctx.Discord.Util.escapeMarkdown(m.user.tag)} \`(${m.user.bot ? "BOT" : "USER"})\` (${moment.utc(m.joinedAt).fromNow()})`
)
embeds = Array.from({
    length: Math.ceil(embeds.length / 10)
}, (a, r) => embeds.slice(r * 10, r*10 + 10))
let findUserIndex = embeds.findIndex(m => m.some(e => e.match(/\*\*#(\d+) (.*) <--\*\*/g)))
embeds = embeds.map(e => new ctx.Discord.MessageEmbed().setColor(ctx.client.color).setTitle("Join Positions").setDescription(e))
await ctx.commandFunctions.paginate(ctx, ctx.message,{
    type: ctx.flags.includes("noembed") ? "message" : embeds,
    messages: embeds.map(t => ctx.flags.includes("noembed") ? ctx.getAllTextFromEmbed(t) : t),
    page: findUserIndex, 
    time: 60000
})
}
module.exports.help = {
    name: "jp",
    owner: false,
    description: "Sends join position of all users",
    usage: "[user]",
    aliases: ["joinposition"],
    category: "info"
}