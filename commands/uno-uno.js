module.exports.run = async ctx => {
    await  ctx.client.uno.UNO(ctx.message)
    }
    module.exports.help = {
        name: "uno",
        owner: false,
        description: "Calls uno in uno",
        usage: "",
        aliases: ["uno"],
        category: "uno"
    }