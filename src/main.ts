import 'colors'
import {Scenes, session, Telegraf} from 'telegraf'
import {config} from 'dotenv'
import startCommand from './commands/startCommand'
import helpCommand from './commands/helpCommand'
import fromScene from './scenes/fromScene'
import fromCommand from './commands/fromCommand'
import toScene from './scenes/toScene'
import toCommand from './commands/toCommand'
import {IContext} from './interfaces/context.interface'
import LocalSession from 'telegraf-session-local'

config()

const bot = new Telegraf<IContext>(`${process.env.BOT_TOKEN}`)

const stage = new Scenes.Stage<IContext>([fromScene, toScene])

bot.use(new LocalSession({database: './data/session.json'}).middleware())
bot.use(stage.middleware())

bot.start(startCommand)
bot.help(helpCommand)

bot.command('from', fromCommand)
bot.command('to', toCommand)
bot.command('lang', ctx => ctx.reply(`${ctx.session.from} - ${ctx.session.to}`))

;(async function () {
    await bot.launch()
    console.log('Bot launched successfully!'.blue.underline)
})()
