import {Telegraf} from 'telegraf'
import {config} from 'dotenv'
import 'colors'

config()

const bot = new Telegraf(`${process.env.BOT_TOKEN}`)

bot.start(function (ctx, next) {
    ctx.reply('Start command')
})

bot.help(function (ctx) {
    ctx.reply('Help command')
})

bot.settings(function (ctx) {
    ctx.reply('Setting command')
})

async function launchBot() {
    try {
        await bot.launch()
        console.log('Bot successfully launched!'.underline.blue)
    } catch (e) {
        console.log(e)
        console.log(`Error while launching bot: ${e}`.red.underline)
    }
}

(async () => launchBot())()
