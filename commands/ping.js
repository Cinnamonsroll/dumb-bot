module.exports.run = async ctx => {
    let guildModel = require("../models/guild.js")
let dbPing = Date.now()
await guildModel.findOne()
dbPing = Date.now() - dbPing
let circles = {
    green: "🟢",
    yellow: "🟡",
    red: "🔴"
}

let m = await ctx.message.channel.send(ctx.flags.includes("noembed") ? ctx.getAllTextFromEmbed(
    new ctx.Discord.MessageEmbed({
        color: ctx.client.color, 
        fields:[
            {name:"Websocket",
             value: `${ctx.client.ws.ping <= 200 ? circles.green : ctx.client.ws.ping <= 400 ? circles.yellow : circles.red} ${ctx.client.ws.ping}ms`
            }, {
                name: "Database",
                 value: `${dbPing <= 200 ? circles.green : dbPing <= 400 ? circles.yellow : circles.red} ${dbPing}ms`
                }
            ]
        }))
        : new ctx.Discord.MessageEmbed({
            color: ctx.client.color, 
            fields:[
                {name:"Websocket",
                 value: `${ctx.client.ws.ping <= 200 ? circles.green : ctx.client.ws.ping <= 400 ? circles.yellow : circles.red} ${ctx.client.ws.ping}ms`
                }, {
                    name: "Database",
                     value: `${dbPing <= 200 ? circles.green : dbPing <= 400 ? circles.yellow : circles.red} ${dbPing}ms`
                    }
                ]
            }))
            
           
            
            m.delete()
            ctx.message.channel.send(ctx.flags.includes("noembed") ? ctx.getAllTextFromEmbed(
                new ctx.Discord.MessageEmbed({
                    color: ctx.client.color, 
                    fields:[
                     
                        {name:"Websocket",
                         value: `${ctx.client.ws.ping <= 200 ? circles.green : ctx.client.ws.ping <= 400 ? circles.yellow : circles.red} ${ctx.client.ws.ping} ms`
                        }, {
                            name: "Database",
                             value: `${dbPing <= 200 ? circles.green : dbPing <= 400 ? circles.yellow : circles.red} ${dbPing} ms`
                            }
                        ]
                    }))
                    : new ctx.Discord.MessageEmbed({
                        color: ctx.client.color, 
                        fields:[
                            {
                                name: "RoundTrip",
                                value:  `${ctx.message.createdTimestamp - m.createdTimpstamp <= 200 ? circles.green : ctx.message.createdTimestamp - m.createdTimpstamp <= 400 ? circles.yellow : circles.red} ${ctx.message.createdTimestamp - m.createdTimpstamp}ms`
                                                        },
                            {name:"Websocket",
                             value: `${ctx.client.ws.ping <= 200 ? circles.green : ctx.client.ws.ping <= 400 ? circles.yellow : circles.red} ${ctx.client.ws.ping}ms`
                            }, {
                                name: "Database",
                                 value: `${dbPing <= 200 ? circles.green : dbPing <= 400 ? circles.yellow : circles.red} ${dbPing}ms`
                                }
                            ]
                        }))

}
module.exports.help = {
    name: "ping",
    owner: false,
    description: "Pings the bot",
    usage: "",
    aliases: ["pong"],
    category: "general"
}