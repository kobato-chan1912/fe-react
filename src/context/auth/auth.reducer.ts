export interface IAuthState {
  isAuthenticated: boolean
}

export const initialAuthState: IAuthState = {
  isAuthenticated: false,
}

export type AuthAction = {
  type: 'SWITCH_AUTH_STATE'
  payload: {
    state: boolean
  }
}

export const authReducer = (prevState: IAuthState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case 'SWITCH_AUTH_STATE':
      return { ...prevState, isAuthenticated: action.payload.state }
    default:
      return prevState
  }
}
