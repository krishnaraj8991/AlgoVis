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
  GreedyBFS,
} = require("./themeType");

const initialState = {
  light: true,
  animation: true,
  playpause: false,
  animationSpeed: 600,
  algo: BFS,
  algoName: "Dijkstra's Algorithm",
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
      const { algo, algoName } = action.payload;
      if (algo == BFS || algo == DFS || algo == Astar || algo == GreedyBFS) {
        console.log(algoName, "Selected");
        return {
          ...state,
          algo,
          algoName,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default ThemeReducer;
