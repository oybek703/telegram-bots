import {IContext} from '../interfaces/context.interface'

function toCommand(ctx: IContext) {
    return ctx.scene.enter('to')
}

export default toCommand
