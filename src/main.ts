import 'colors'
import {Scenes, session, Telegraf} from 'telegraf'
import {config} from 'dotenv'
import startCommand from './commands/startCommand'
import helpCommand from './commands/helpCommand'
import fromScene from './scenes/fromScene'
import fromCommand from './commands/fromCommand'

config()

const bot = new Telegraf<Scenes.SceneContext>(`${process.env.BOT_TOKEN}`)

const stage = new Scenes.Stage<Scenes.SceneContext>([fromScene], {ttl: 10})

bot.use(session())
bot.use(stage.middleware())

bot.start(startCommand)
bot.help(helpCommand)

bot.command('from', fromCommand)


;(async function () {
    await bot.launch()
    console.log('Bot launched successfully!'.blue.underline)
})()
