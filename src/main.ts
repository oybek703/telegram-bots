import 'colors'
import {Telegraf} from 'telegraf'
import {config} from 'dotenv'
import start from './commands/start'
import help from './commands/help'

config()

const bot = new Telegraf(`${process.env.BOT_TOKEN}`)

bot.start(start)
bot.help(help)


;(async function () {
    await bot.launch()
    console.log('Bot launched successfully!'.blue.underline)
})()
