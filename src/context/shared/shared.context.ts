import { createContext, Dispatch, Context } from 'react'
import { ISharedState, SharedAction } from './shared.reducer'


export interface ISharedContext {
  sharedState: ISharedState,
  dispathSharedAction: Dispatch<SharedAction>
}
export const SharedContext: Context<any> = createContext(null)
