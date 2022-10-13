import {Scenes} from 'telegraf'

function fromCommand(ctx: Scenes.SceneContext) {
    ctx.scene.enter('from')
}

export default fromCommand
