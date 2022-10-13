import 'colors'
import {config} from 'dotenv'
import {Scenes, session, Telegraf} from 'telegraf'

config()

const bot = new Telegraf(`${process.env.BOT_TOKEN}`)

const contactDataWizard = new Scenes.WizardScene(
    'CONTACT_DATA_WIZARD_SCENE_ID',
    async function (ctx, next) {
        await ctx.reply('What is your name?')
        // @ts-ignore
        ctx.wizard.state.contactData = {}
        return ctx.wizard.next()
    },
    async function (ctx, next) {
        await ctx.reply('Enter your email: ')
        return ctx.wizard.next()
    },
    async function (ctx, next) {
        await ctx.reply('Thank you for your replies, we will contact you soon.')
        return ctx.scene.leave()
    }
)

const stage = new Scenes.Stage()
// @ts-ignore
stage.register(contactDataWizard)
bot.use(session())
// @ts-ignore
bot.use(stage.middleware())

bot.start(function (ctx) {
    // @ts-ignore
    ctx.scene.enter('CONTACT_DATA_WIZARD_SCENE_ID')
    // ctx.reply('Hi, ✋ It is echo bot!')
})


;(async function () {
    await bot.launch()
    console.log('Bot launched successfully!'.blue.underline)
})()
