module.exports.run = async ctx => {
    await  ctx.client.uno.closeGame(ctx.message)
    }
    module.exports.help = {
        name: "close-game",
        owner: false,
        description: "Closes a game of uno",
        usage: "",
        aliases: ["cg"],
        category:"uno"
    }