import {Context, Scenes} from 'telegraf'

interface ISession extends Scenes.SceneSession {
    from: string
    to: string
}

export interface IContext extends Context {
    scene: Scenes.SceneContextScene<IContext>
    session: ISession
}
