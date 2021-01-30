module.exports.run = async ctx => {
    await  ctx.client.uno.viewWinners(ctx.message)
    }
    module.exports.help = {
        name: "view-winners",
        owner: false,
        description: "Views uno winners",
        usage: "",
        aliases: ["viewwinners"],
        category: "uno"
    }