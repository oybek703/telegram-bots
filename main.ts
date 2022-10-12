import 'colors'
import {Telegraf} from 'telegraf'
import {config} from 'dotenv'
import axios, {AxiosError} from 'axios'
import {code} from 'currency-codes'
import {Currency} from './interfaces'

config()

const bot = new Telegraf(`${process.env.BOT_TOKEN}`)

bot.start(function (ctx) {
    ctx.reply('Hi, ✋ It is currency bot!')
})

bot.on('sticker', function (ctx) {
    ctx.reply('👍')
})

bot.hears(/(.*?)/gi, async function (ctx) {
    try {
        const currencyText = ctx.message.text
        const res = code(currencyText)
        if (res?.number) {
            ctx.reply('Please wait...')
            const {data} = await axios<Currency[]>('https://api.monobank.ua/bank/currency')
            const foundCurrency = data.find(c => c.currencyCodeA === +res.number)
            if (!foundCurrency) {
                return ctx.reply('Currency not found in Monobank API!')
            }
            ctx.reply(JSON.stringify(foundCurrency, null, 2))
        } else {
            ctx.reply('Invalid currency ⛔. Please enter valid one!')
        }
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            if (e.response?.status === 429) {
                return ctx.reply('Too many requests. ⌛ Please wait for a while!')
            }
        }
        // @ts-ignore
        ctx.reply(e.message)
    }
})

;(async function () {
    await bot.launch()
    console.log('Bot started'.blue.underline)
})()
