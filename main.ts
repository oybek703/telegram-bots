import 'colors'
import {config} from 'dotenv'
import {Context, Scenes, session, Telegraf} from 'telegraf'

config()

const bot = new Telegraf<Context>(`${process.env.BOT_TOKEN}`)

const createScene = new Scenes.WizardScene(
    'create',
    async function (ctx, next) {
        await ctx.reply('Enter your weight (kg): ')
        // @ts-ignore
        return ctx.wizard.next()
    },
    async function (ctx, next) {
        // @ts-ignore
        const text = ctx.message.text
        if (isNaN(text)) return ctx.reply('Please enter valid value!')
        // @ts-ignore
        ctx.wizard.state.wieght = +text
        await ctx.reply('Enter your height (sm): ')
        return ctx.wizard.next()
    },
    async function (ctx, next) {
        // @ts-ignore
        const text = ctx.message.text
        if (isNaN(text)) return ctx.reply('Please enter valid value!')
        // @ts-ignore
        ctx.wizard.state.hieght = +text
        await ctx.reply('Thank you! For another try type - /start')
        console.log(ctx.wizard.state)
        await ctx.scene.leave()
    }
)

const stage = new Scenes.Stage()
// @ts-ignore
stage.register(createScene)

bot.use(session())
// @ts-ignore
bot.use(stage.middleware())

bot.start(function (ctx) {
    // @ts-ignore
    ctx.scene.enter('create')
    // ctx.reply('Hi, ✋ It is echo bot!')
})


;(async function () {
    await bot.launch()
    console.log('Bot launched successfully!'.blue.underline)
})()
