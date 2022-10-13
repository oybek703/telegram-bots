import {Context} from 'telegraf'

async function helpCommand(ctx: Context) {
    await ctx.reply(`
        /from - Set from language
        /to - Set to language
        Also you can use this bot in inline-mode.
        
        This bot uses ISO-639-1 standard.
        Check list here: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
        For example: 
        en - English, es - Spanish, ru - Russian     
    `.replace(/^\s+/gm, '')
    )
}

export default helpCommand
