import {Scenes} from 'telegraf'
import {IContext} from '../interfaces/context.interface'

const toScene = new Scenes.BaseScene<IContext>('to')

toScene.enter(async function (ctx) {
    return await ctx.reply('Please enter to language code: ')
})

toScene.on('text', function (ctx) {
    if (ctx.message.text.length > 2 || ctx.message.text.length === 1) {
        return ctx.reply('Language code must be 2 chars.')
    }
    ctx.reply(`${ctx.message.text} set as from language!`)
    return ctx.scene.leave()
})

toScene.on(['message', 'document', 'photo'], function (ctx) {
    return ctx.reply('Only text messages are accepted!')
})

toScene.leave(async function (ctx) {
    await ctx.reply('Thank you for setting to language.')
})

export default toScene
