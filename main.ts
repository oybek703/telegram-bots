import 'colors'
import {Telegraf} from 'telegraf'
import {config} from 'dotenv'

if (process.env.NODE_ENV === 'development') config()

const bot = new Telegraf(`${process.env.BOT_TOKEN}`)

bot.start(function (ctx) {
    ctx.reply('Hi, ✋ It is echo bot!')
})

bot.help(function (ctx) {
    ctx.reply('Send me any message and I will copy that message!')
})

bot.on('message', async function (ctx) {
    await ctx.telegram.copyMessage(ctx.chat.id, ctx.message.from.id, ctx.message.message_id)
})

;(async function () {
    await bot.launch()
    console.log('Bot launched successfully!'.blue.underline)
})()
