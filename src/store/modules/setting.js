const TOGGLE_OPEN = 'TOGGLE_OPEN'
const TOGGLE_TAG = 'TOGGLE_TAG'
const TOGGLE_FIX_HEADER = 'TOGGLE_FIX_HEADER'
const CHANGE_VISIBLE = 'CHANGE_VISIBLE'
const CHANGE_MODE = 'CHANGE_MODE'

const defaultState = {
  open: false,
  tagShow: true,
  fixHeader: true,
  settingVisible: false,
  mode: 'inline',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_OPEN:
      return { ...state, open: !state.open }
    case TOGGLE_TAG:
      return { ...state, tagShow: !state.tagShow }
    case TOGGLE_FIX_HEADER:
      return { ...state, fixHeader: !state.fixHeader }
    case CHANGE_VISIBLE:
      return { ...state, settingVisible: !state.settingVisible }
    case CHANGE_MODE:
      return {
        ...state,
        mode: state.mode == 'inline' ? 'horizontal' : 'inline',
      }
    default:
      return state
  }
}

export const toggleOpen = () => {
  return { type: TOGGLE_OPEN }
}
export const toggleTag = () => {
  return { type: TOGGLE_TAG }
}
export const toggleFixHeader = () => {
  return { type: TOGGLE_FIX_HEADER }
}
export const changeSettingVisible = () => {
  return { type: CHANGE_VISIBLE }
}
export const changeMode = () => {
  return { type: CHANGE_MODE }
}
