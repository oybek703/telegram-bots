import {Telegraf} from 'telegraf'
import {config} from 'dotenv'
import 'colors'
import {Update} from 'typegram'

config()

const bot = new Telegraf(`${process.env.BOT_TOKEN}`)

bot.use(async function (ctx, next) {
    console.log(new Date().toString())
    ctx.state.user = {name: 'John', age: 23}
    await next()
})

bot.catch(function (err, ctx) {
    console.log('ERROR', err)
})

bot.start(function (ctx, next) {
    console.log(ctx.state)
    ctx.reply('Start command')
})

bot.help(function (ctx) {
    ctx.reply('Help command')
})

bot.settings(function (ctx) {
    ctx.reply('Setting command')
})

bot.command(['stop', 'finish'], function (ctx) {
    ctx.reply('Stop commmand ✋  ')
})

bot.mention('botfather', function (ctx) {
    ctx.reply('Bot father mention 🅱')
})

bot.phone('+381991231231', function (ctx) {
    ctx.reply('This is +381991231231!📱')
})

bot.command('ctx', function (ctx) {
    console.log(ctx.update.message.from.first_name)
    ctx.reply(`Hi, ${ctx.update.message.from.first_name} ✋`)
})

bot.hears('user', function (ctx) {
    console.log(ctx.state)
    ctx.reply(JSON.stringify(ctx.state))
})

bot.on(['message', 'edited_message'], function (ctx) {
    console.log(ctx.message)
    console.log(ctx.updateType)
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
