module.exports.run = async ctx => {
    if(!ctx.message.member.permissions.has("MANAGE_MESSAGES")) return ctx.commandFunctions.sendMessage(ctx, "You can't use this")
    await  ctx.client.uno.updateSetting(ctx.message)
    }
    module.exports.help = {
        name: "update-settings",
        owner: false,
        description: "Update uno settings",
        usage: "",
        aliases: ["updatesettings"],
        category: "uno"
    }