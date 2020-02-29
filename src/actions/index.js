import { CHANGE_STATE_PROPS, SAVE_FORM_DATA } from '../constants/index'

export function changeStateProps (prop, value, reducer) {
  return dispatch => {
    dispatch({
      type: reducer.toUpperCase() + CHANGE_STATE_PROPS,
      state: {
        prop: prop,
        value: value
      }
    })
  }
}

export function saveFormData (prop, value, reducer) {
  return dispatch => {
    dispatch({
      type: reducer.toUpperCase() + SAVE_FORM_DATA,
      state: {
        prop: prop,
        value: value
      }
    })
  }
}
