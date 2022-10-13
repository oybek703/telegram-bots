import 'colors'
import {Scenes, Telegraf} from 'telegraf'
import {config} from 'dotenv'
import startCommand from './commands/startCommand'
import helpCommand from './commands/helpCommand'
import fromScene from './scenes/fromScene'
import fromCommand from './commands/fromCommand'
import toScene from './scenes/toScene'
import toCommand from './commands/toCommand'
import {IContext} from './interfaces/context.interface'
import LocalSession from 'telegraf-session-local'
import translate from './services/translate'
import {AxiosError} from 'axios'

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

bot.on('message', async function (ctx) {
    try {
        if ('text' in ctx.message) {
            const {from, to} = ctx.session
            await translate(ctx.message.text, from, to)
        } else {
            ctx.reply('Invalid text!')
        }
    } catch (e) {
        console.log(e)
        if (e instanceof AxiosError) {
            console.log(e.message)
        }
        ctx.reply('Something went wrong!')
    }
})

;(async function () {
    await bot.launch()
    console.log('Bot launched successfully!'.blue.underline)
})()
