import update from "immutability-helper";
import { CHANGE_STATE_PROPS, SAVE_FORM_DATA } from "../constants/index";

const REDUCER = "FORM";
const defaultState = {
  formData: {
    gamertag: "",
    email: "",
    password: ""
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case REDUCER + CHANGE_STATE_PROPS:
      return update(state, {
        [action.state.prop]: { $set: action.state.value }
      });
    case REDUCER + SAVE_FORM_DATA:
      return update(state, {
        formData: {
          [action.state.prop]: { $set: action.state.value }
        }
      });
    default:
      return state;
  }
};
