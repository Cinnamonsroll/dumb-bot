module.exports.run = async ctx => {
    let moment = require("moment");
    let channel =
        ctx.message.mentions.channels.first() ||
        ctx.message.guild.channels.cache.get(ctx.args[0]) ||
        ctx.message.channel,
      snipes = ctx.client.snipes.get(channel.id),
      page = 0,
      reactions = ["⏪", "◀️", "▶️", "⏩"];
    if (!snipes)
      return ctx.commandFunctions.sendMessage(
        ctx,
        `No snipes have been found for the channel \`${channel.name}\``
      );
    let users = await Promise.all(
      snipes.map(snipe => ctx.client.users.fetch(snipe.author))
    );
    if (ctx.flags.includes("history")) {
      let history =
        snipes.length > 20
          ? `${snipes
              .map(
                (snipe, c) =>
                  `${users[c].tag} | ${moment
                    .utc(snipe.date)
                    .fromNow()} | Snipe **${c + 1}**`
              )
              .slice(0, 20)
              .join("\n")}\n${snipes.length - 20} more...`
          : `${snipes
              .map(
                (snipe, c) =>
                  `${users[c].tag} | ${moment
                    .utc(snipe.date)
                    .fromNow()} | Snipe **${c + 1}**`
              )
              .slice(0, 20)
              .join("\n")}`;
      let embed = new ctx.Discord.MessageEmbed()
        .setColor(ctx.client.color)
        .addField("Channel:", `${channel} (${channel.name})`)
        .addField(`History`, `${history}`);
      ctx.message.channel.send(embed).then(async msg => {
        await Promise.all(reactions.map(r => msg.react(r)));
        const filter = (reaction, user) =>
          reactions.includes(reaction.emoji.name) &&
          user.id === ctx.message.author.id;
        let col = msg.createReactionCollector(filter);
        col.on("collect", r => {
          switch (r.emoji.name) {
            case "⏪":
              page = 0;
              break;
            case "◀️":
              page = 1
                ? (page = 0)
                : page === 0
                ? (page = snipes.length)
                : page--;
              break;
            case "▶️":
              page === snipes.length ? (page = 1) : page++;
              break;
            case "⏩":
              page = snipes.length;
              break;
          }
          if (page === 0) {
            let embed = new ctx.Discord.MessageEmbed()
              .setColor(ctx.client.color)
              .addField("Channel:", `${channel} (${channel.name})`)
              .addField(`History`, `${history}`);
            msg.edit(embed);
          } else {
            let newEmbed = new ctx.Discord.MessageEmbed()
              .setColor(ctx.client.color)
              .setAuthor(
                `${ctx.client.users.cache.get(snipes[page - 1].author).tag}`
              )
              .addField("Channel:", `${channel} (${channel.name})`)
              .addField("When:", `${moment.utc(snipes[page - 1].date).fromNow()}`)
              .addField("Content:", snipes[page - 1].content)
              .setFooter(`${page}/${snipes.length}`);
            snipes[page - 1].image !== null
              ? newEmbed.setImage(snipes[page - 1].image)
              : "";
            msg.edit(newEmbed);
          }
        });
      });
    }else{
      let num = isNaN(ctx.args[0]) ? 0 : !ctx.args[0] ? 0 : ctx.args[0] < snipes.length && ctx.args[0] > 0 ? ctx.args[0] : 0
      let newEmbed = new ctx.Discord.MessageEmbed()
              .setColor(ctx.client.color)
              .setAuthor(
                `${ctx.client.users.cache.get(snipes[num].author).tag}`
              )
              .addField("Channel:", `${channel} (${channel.name})`)
              .addField("When:", `${moment.utc(snipes[num].date).fromNow()}`)
              .addField("Content:", snipes[num].content)
              .setFooter(`${page+1}/${snipes.length}`);
            snipes[num].image !== null
              ? newEmbed.setImage(snipes[num].image)
              : "";
      ctx.commandFunctions.sendMessage(ctx, newEmbed)
    }
  };
  module.exports.help = {
    name: "snipe",
    owner: false,
    description: "Shows the last deleted message(s)",
    usage: "",
    aliases: ["deletemessage"],
    category: "info"
  };
  