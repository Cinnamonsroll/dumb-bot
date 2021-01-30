module.exports = {
  getAllTextFromEmbed(embed) {
    let text = "";
    if (embed.title) text += `**${embed.title}**`;
    if (embed.description) text += `\n${embed.description}`;
    if (embed.fields) {
      text += "\n";
      for (const field of embed.fields) {
        text += `\n**${field.name}**\n${field.value}`;
      }
    }
    return text;
  },
  sendMessage(ctx, message, ops = {}) {
    if (
      ctx.flags?.includes("noembed") &&
      message instanceof ctx.Discord.MessageEmbed
    ) {
      return ctx.message.channel
        .send(ctx.getAllTextFromEmbed(message))
        .then(async m => {
          await m.react("788537874140233759");
          let filter = (user, reaction) =>
            reaction.emoji.id === "788537874140233759" &&
            user.id === ctx.message.author.id;
          let col = m.createReactionCollector(filter);
          col.on("collect", (reaction, user) => {
            m.delete();
          });
        });
    } else {
      ctx.message.channel.send(message).then(async m => {
        await m.react("788537874140233759");
        let filter = (user, reaction) =>
          reaction.emoji.id === "788537874140233759" &&
          user.id === ctx.message.author.id;
        let col = m.createReactionCollector(filter);
        col.on("collect", (reaction, user) => {
          m.delete();
        });
      });
    }
  },
  async checkDatabase(ctx) {
    let model = require("../models/guild.js");
    let guildData = await model.findOne({ guild: ctx.message.guild.id });
    if (!guildData) {
      guildData = await model.create({
        guild: ctx.message.guild.id
      });
      return { guild: guildData };
    }
  },
  async paginate(ctx, message, ops = {}) {
    let options = {
      page: ops.page || 0,
      type: ops.type,
      messages: ops.messages,
      time: ops.time
    };
    let pages = options.page,
      reactions =
        options.messages.length > 1 ? ["⏪", "◀️", "⏹️", "▶️", "⏩"] : ["⏹️"],
      mainMessage = await message.channel.send(options.messages[pages]);

    await Promise.all(reactions.map(r => mainMessage.react(r)));
    let collector = mainMessage.createReactionCollector(
      (reaction, user) =>
        reactions.some(r => r === reaction.emoji.name) &&
        user.id === message.author.id,
      { time: options.time }
    );
    collector.on("collect", async (reaction, user) => {
      switch (reaction.emoji.name) {
        case "⏪":
          if (pages === 0) return;
          pages = 0;
          break;
        case "◀️":
          if (pages === 0) {
            pages = options.messages.length - 1;
          } else {
            pages -= 1;
          }
          break;
        case "⏹️":
          for (let reaction of mainMessage.reactions.cache.filter(r =>
            r.users.cache.has(ctx.client.user.id).array()
          )) {
            await reaction.users.remove(ctx.client.user.id);
          }
          return collector.stop();
          break;
        case "▶️":
          if (pages === options.messages.length - 1) {
            pages = 0;
          } else {
            pages += 1;
          }
          break;
        case "⏩":
          if (pages === options.messages.length - 1) return;
          pages = options.messages.length - 1;
          break;
      }
      await mainMessage.edit(
        options.type === "message"
          ? options.messages[pages]
          : { embed: options.messages[pages] }
      );
    });
  }
};
