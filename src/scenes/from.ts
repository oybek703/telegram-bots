import { Scenes } from "telegraf"

// @ts-ignore
const fromScene = new Scenes.BaseScene('from')

fromScene.enter(async function (ctx, next) {
    await ctx.reply('Set from language: ')
})

fromScene.leave(async function (ctx, next) {
    await ctx.reply('Thanks for setting from language.')
})

export default fromScene
