import 'colors'
import {session, Telegraf} from 'telegraf'
import {config} from 'dotenv'
import start from './commands/start'
import help from './commands/help'
import {Stage} from 'telegraf/typings/scenes'
import fromScene from './scenes/from'

config()

const bot = new Telegraf(`${process.env.BOT_TOKEN}`)

// @ts-ignore
const stage = new Stage([fromScene])

bot.use(session())
// @ts-ignore
bot.use(stage.middleware())

bot.start(start)
bot.help(help)
bot.command('from', async function (ctx) {
    // @ts-ignore
    ctx.scene.enter('from')
})


;(async function () {
    await bot.launch()
    console.log('Bot launched successfully!'.blue.underline)
})()
