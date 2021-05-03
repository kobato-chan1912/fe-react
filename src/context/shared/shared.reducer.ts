export interface ISharedState {
  language: string
}

export const initSharedState: ISharedState = {
  language: 'en'
}

export type SharedAction = {
  type: 'SWITCH_LANGUAGE',
  payload: {
    state: string
  }
}

export const sharedReducer = (preState: ISharedState, action: SharedAction): ISharedState => {
  switch (action.type) {
    case 'SWITCH_LANGUAGE':
      return { ...preState, language: action.payload.state }
    default:
      return preState
  }
}