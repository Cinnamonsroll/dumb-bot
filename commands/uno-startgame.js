module.exports.run = async ctx => {
    await  ctx.client.uno.startGame(ctx.message)
    }
    module.exports.help = {
        name: "start-game",
        owner: false,
        description: "Starts uno",
        usage: "",
        aliases: ["sg"],
        category: "uno"
    }
