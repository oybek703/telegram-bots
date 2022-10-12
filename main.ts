import 'colors'
import {Telegraf} from 'telegraf'
import {config} from 'dotenv'
import {InlineQueryResultPhoto} from 'typegram/inline'
import searchImages from './src/searchImages'

config()

const bot = new Telegraf(`${process.env.BOT_TOKEN}`)

bot.start(function (ctx) {
    ctx.reply(`Hi 🖐 Welcome. Type /help for using bot.`)
})

bot.help(function (ctx) {
    ctx.reply(`Type @yo_bot1_bot in chats and start using bot.`)
})

bot.catch(async function (err, ctx) {
    console.log('THIS IS CUSTOM CATCH', err)
})

bot.on('inline_query', async function (ctx) {
    const query = ctx.inlineQuery.query
    const {hits} = await searchImages(query)
    if (!query) return
    const updatedImages: InlineQueryResultPhoto[] = hits.map(image => {
        return {
            type: 'photo',
            thumb_url: image.previewURL,
            photo_url: image.largeImageURL,
            id: image.id,
            title: image.user,
            reply_markup: {
                inline_keyboard: [
                    [{text: `${image.likes} ❤`, url: image.pageURL}],
                    [{text: 'Share with friends', switch_inline_query: ''}]
                ]
            }
        }
    })
    ctx.answerInlineQuery(updatedImages, {cache_time: 100})
})

;(async function () {
    await bot.launch()
    console.log('Bot launched successfully!'.blue.underline)
})()
