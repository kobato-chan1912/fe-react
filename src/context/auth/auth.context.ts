import { createContext, Dispatch, Context } from 'react'

import { AuthAction, IAuthState } from './auth.reducer'

export interface IAuthContext {
  authState: IAuthState
  dispatchAuthAction: Dispatch<AuthAction>
}
export const AuthContext: Context<any> = createContext(null)
