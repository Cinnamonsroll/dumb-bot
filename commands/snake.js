module.exports.run = async ctx => {
    const GameCord = require('gamecord-fork').djs 
new GameCord.SnakeGame(ctx.message)
.setTitle("Snake")
.setColor(ctx.client.color)
.setTime(60000 * 3)
.on("end", game => ctx.message.channel.send(`${game.message.author.tag} ended with ${game.score}`))
.run()
}
module.exports.help = {
    name: "snake",
    owner: false,
    description: "A fun game of snake",
    usage: "",
    aliases: ["snek"],
    category: "games"
}