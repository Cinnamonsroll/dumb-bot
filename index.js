let Discord = require("discord.js")
let client = new Discord.Client({
    fetchAllMembers: true,
    partials:["MESSAGE", "USER"],
    restTimeOffset: 60,
    ws:{
        intents: 32767
    }
})
let { DiscordUNO } = require("discord-uno")
let mongoose = require("mongoose")
client.color = "#2f3136"
client.snipes = new Discord.Collection()
client.config = require("./config.json")
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.owners = ["606279329844035594"]
client.uno =  new DiscordUNO()
mongoose.connect(client.config.mongo, { useUnifiedTopology: true })
let fs = require("fs")
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)
    let jsfiles = files.filter(t => t.split(".").pop() === "js")
    jsfiles.forEach(file => {
        let props = require(`./commands/${file}`)
        console.log(`${file} Loaded!`)
        client.commands.set(props.help.name, props)
        props.help.aliases.forEach(alias => {
            if(alias){
                client.aliases.set(alias, props.help.name)
            }
        })
    })
})
fs.readdir("./events/", (err, files) => {
    if(err) console.log(err)
    let jsfiles = files.filter(t => t.split(".").pop() === "js")
    jsfiles.forEach(file => {
        let eventN = file.split(".")[0]
        console.log(`Loading event: ${eventN}`)
        let event = require(`./events/${eventN}`)
        client.on(eventN, event.bind(null, client))
    })
})
client.login(client.config.token)