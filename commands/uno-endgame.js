module.exports.run = async ctx => {
    await  ctx.client.uno.endUser(ctx.message)
    }
    module.exports.help = {
        name: "end-game",
        owner: false,
        description: "Ends a game of uno",
        usage: "",
        aliases: ["eg"],
        category: "uno"
    }