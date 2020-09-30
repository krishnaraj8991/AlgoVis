import { FlipAnimationState } from "./themeActions";

// const { Switch } = require("@material-ui/core");
const {
  flip,
  flip_Animation_State,
  Play_Pause,
  BFS,
  Set_Algo,
  DFS,
  Astar,
} = require("./themeType");

const initialState = {
  light: true,
  animation: true,
  playpause: false,
  animationSpeed: 600,
  algo: BFS,
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
    case Set_Algo: {
      if (
        action.payload == BFS ||
        action.payload == DFS ||
        action.payload == Astar
      ) {
        console.log(action.payload, "Selected");
        return {
          ...state,
          algo: action.payload,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default ThemeReducer;
