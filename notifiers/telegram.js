module.exports = class Telegram {
  constructor() {
    const { Telegraf } = require('telegraf');

    this.telegraf = new Telegraf(process.env.TELEGRAM_BOT_API);
  }

  send(message) {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!chatId) {
      console.log('Telegram: No chat id given');
      return;
    }
    this.telegraf.telegram.sendMessage(chatId, message).catch(err => {
      console.log(err);
    });
  }
};
