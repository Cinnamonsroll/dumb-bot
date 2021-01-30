module.exports.run = async ctx => {
    await  ctx.client.uno.addUser(ctx.message)
    }
    module.exports.help = {
        name: "join-game",
        owner: false,
        description: "Join a game of uno",
        usage: "",
        aliases: ["jg"],
        category: "uno"
    }