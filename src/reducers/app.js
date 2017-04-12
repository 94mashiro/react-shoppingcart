const INIT_APPS = 'INIT_APPS'
const ADD_APP = 'ADD_APP'

export default function (state = {apps:[]}, action) {
  switch (action.type) {
    case INIT_APPS:
      return { apps: action.apps }
    case ADD_APP:
      console.log("Add app done")
      return { apps: [...state.apps, action.app] }
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