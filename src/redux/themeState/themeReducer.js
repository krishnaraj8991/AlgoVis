import { FlipAnimationState } from "./themeActions";

const { Switch } = require("@material-ui/core");
const { flip, flip_Animation_State, Play_Pause } = require("./themeType");

const initialState = {
  light: true,
  animation: true,
  playpause: false,
  animationSpeed: 600,
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
    case Play_Pause:
      return {
        ...state,
        playpause: !state.playpause,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
