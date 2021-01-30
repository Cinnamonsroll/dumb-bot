module.exports.run = async ctx => {
let Mines = require("discord.js-minesweeper")
let mm = new Mines({
    rows: 10,
    columns: 10,
    mines: 11,
})
ctx.commandFunctions.sendMessage(ctx, mm.start())
}
module.exports.help = {
    name: "minesweeper",
    owner: false,
    description: "A fun game of minesweeper",
    usage: "",
    aliases: ["bombs"],
    category: "games"
}