module.exports.run = async ctx => {
    await  ctx.client.uno.viewCards(ctx.message)
    }
    module.exports.help = {
        name: "cards",
        owner: false,
        description: "Views uno cards",
        usage: "",
        aliases: ["viewcards"],
        category: "uno"
    }