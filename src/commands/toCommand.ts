import {Scenes} from 'telegraf'

function toCommand(ctx: Scenes.SceneContext) {
    ctx.scene.enter('to')
}

export default toCommand
