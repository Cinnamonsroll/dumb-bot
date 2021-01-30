module.exports.run = async ctx => {
    await  ctx.client.uno.playCard(ctx.message)
    }
    module.exports.help = {
        name: "playcard",
        owner: false,
        description: "Plays a card in uno",
        usage: "",
        aliases: ["playcard"],
        category:"uno"
    }