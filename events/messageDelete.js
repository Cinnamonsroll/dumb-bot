module.exports = async (client,message) => {
    let snipes = client.snipes.get(message.channel.id) || []
    snipes.unshift({
        content: message.embeds.length > 0 ? require("../functions/commands.js").getAllTextFromEmbed(message.embeds[0]) : message.content,
        author: message.author.id,
        image: message.attachments.first() ? message.attachments.first().proxyURL : "",
        date: Date.now()
    })
    client.snipes.set(message.channel.id, snipes)
}