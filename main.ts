import 'colors'
import {Telegraf} from 'telegraf'
import {config} from 'dotenv'

config()

const bot = new Telegraf(`${process.env.BOT_TOKEN}`)

bot.start(function (ctx) {
    ctx.reply('Start command!')
})

bot.help(function (ctx) {
    ctx.reply('Send me any message and I will copy that message!')
})

bot.use(async function (ctx, next) {
    // @ts-ignore
    await ctx.reply(ctx.message.text)
    await next()
})

;(async function () {
    await bot.launch()
    console.log('Bot started'.blue.underline)
})()
