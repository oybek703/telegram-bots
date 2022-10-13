import {IContext} from '../interfaces/context.interface'

function fromCommand(ctx: IContext) {
    return ctx.scene.enter('from')
}

export default fromCommand
