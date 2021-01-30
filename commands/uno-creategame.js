module.exports.run = async ctx => {
await  ctx.client.uno.createGame(ctx.message)
}
module.exports.help = {
    name: "create-game",
    owner: false,
    description: "Creates a game of uno",
    usage: "",
    aliases: ["cg"],
    category: "uno"
}