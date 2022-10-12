const {Telegraf} = require('telegraf')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.launch().then(function(value) {
  console.log('VALUE => ', value)
}).catch(function(reason) {
  console.log('REASON => ', reason)
})
