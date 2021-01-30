module.exports.run = async ctx => {
    await  ctx.client.uno.viewTable(ctx.message)
    }
    module.exports.help = {
        name: "table",
        owner: false,
        description: "Views uno table",
        usage: "",
        aliases: ["viewtable"],
        category: "uno"
    }