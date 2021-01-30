module.exports.run = async ctx => {
    await  ctx.client.uno.viewSettings(ctx.message)
    }
    module.exports.help = {
        name: "view-settings",
        owner: false,
        description: "Views uno settings",
        usage: "",
        aliases: ["viewsettings"],
        category: "uno"
    }