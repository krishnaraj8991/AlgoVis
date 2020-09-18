import { FlipAnimationState } from "./themeActions";

const { Switch } = require("@material-ui/core");
const { flip, flip_Animation_State } = require("./themeType");

const initialState = {
  light: false,
  animation: false,
};
const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case flip:
      return {
        ...state,
        light: !state.light,
      };
    case flip_Animation_State:
      return {
        ...state,
        animation: !state.animation,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
