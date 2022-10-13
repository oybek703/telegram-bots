import {InlineQueryResultArticle} from 'typegram'
import {IContext} from '../interfaces/context.interface'

async function inlineQuery(ctx: IContext) {
    if (ctx.inlineQuery?.query) {
        const results: InlineQueryResultArticle[] = [{
            type: 'article',
            id: ctx.inlineQuery!.id,
            title: 'Some title',
            input_message_content: {
                message_text: ctx.inlineQuery.query
            }
        }]
        await ctx.answerInlineQuery(results)
    }
    await ctx.answerInlineQuery([])
}

export default inlineQuery
