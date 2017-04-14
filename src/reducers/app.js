const INIT_APPS = 'INIT_APPS'
const ADD_APP = 'ADD_APP'
const SET_CURRENT_APP = 'SET_CURRENT_APP'

export default function (state = {apps:[], currentApp:{}}, action) {
  switch (action.type) {
    case INIT_APPS:
      return { apps: action.apps }
    case ADD_APP:
      console.log("Add app done")
      return { apps: [...state.apps, action.app] }
    case SET_CURRENT_APP:
      return { ...state, currentApp: action.app}
    default:
      return state
  }
}

export const initApps = (apps) => {
  return {type: INIT_APPS, apps}
}

export const addApp = (app) => {
  return {type: ADD_APP, app}
}

export const setCurrentApp = (app) => {
  return {type: SET_CURRENT_APP, app}
}