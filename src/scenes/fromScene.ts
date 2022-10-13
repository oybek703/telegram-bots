import {Scenes} from 'telegraf'

const fromScene = new Scenes.BaseScene<Scenes.SceneContext>('from')

fromScene.enter(async function (ctx, next) {
    await ctx.reply('Please send from language code: ')
})

fromScene.on('text', function (ctx) {
    if (ctx.message.text.length > 2 || ctx.message.text.length === 1) {
        return ctx.reply('Language code must be 2 chars.')
    }
    ctx.reply(`${ctx.message.text} set as from language!`)
    return ctx.scene.leave()
})

fromScene.on('text', function (ctx) {
    ctx.reply('Only text messages are accepted!')
})

fromScene.leave(async function (ctx, next) {
    await ctx.reply('Thanks for setting from language.')
})

export default fromScene
