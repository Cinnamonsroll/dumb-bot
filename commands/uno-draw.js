module.exports.run = async ctx => {
    await  ctx.client.uno.draw(ctx.message)
    }
    module.exports.help = {
        name: "draw",
        owner: false,
        description: "Draws a card in uno",
        usage: "",
        aliases: ["drawcard"],
        category: "uno"
    }