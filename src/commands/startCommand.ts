import {Context} from 'telegraf'

async function startCommand(ctx: Context) {
    await ctx.reply(`
        Hi, 👋! Please set /from language and /to language.
        The default language is 'en'     
    `.replace(/^\s+/gm, '')
    )
}

export default startCommand
