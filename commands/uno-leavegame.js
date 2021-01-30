module.exports.run = async ctx => {
    await  ctx.client.uno.removeUser(ctx.message)
    }
    module.exports.help = {
        name: "leave-game",
        owner: false,
        description: "Leaves a game of uno",
        usage: "",
        aliases: ["lg"],
        category: "uno"
    }