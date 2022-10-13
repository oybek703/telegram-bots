import 'colors'
import {Telegraf} from 'telegraf'
import {config} from 'dotenv'

const isDevelopment = process.env.NODE_ENV === 'development'

if (isDevelopment) config()

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
    try {
        if (isDevelopment) {
            await bot.launch()
        }
        else {
            await bot.launch({
                webhook: {
                    // @ts-ignore
                    port: process.env.PORT ?? 5000,
                    domain: process.env.DOMAIN as string
                }
            })
        }
        console.log(`Bot launched successfully in ${process.env.NODE_ENV} mode!`.blue.underline)
    } catch (e: unknown) {
        console.log('Error while launching bot: ', e)
    }
})()

