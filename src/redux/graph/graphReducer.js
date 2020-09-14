import {
  BlankNode,
  StartNode,
  TargetNode,
  Wall,
  WallTransition,
} from "./graphStates";

import { Fix_AS_WALL, Remove_Wall, Set_AS_WALL } from "./graphTypes";

let DataSize = 100;
console.log("Initializing data", DataSize);
let ar = [];
let leng = DataSize;
for (let i = 0; i < leng; i++) {
  ar[i] = [];
  for (let j = 0; j < leng; j++) {
    ar[i][j] = 1;
    if (i == 0 || j == 0) {
      ar[i][j] = 0;
    }
  }
}
ar[5][5] = StartNode;
ar[5][10] = TargetNode;
// ar[3][3] = 6;
console.log(DataSize);

const initialState = {
  size: DataSize,
  graph: [...ar],
  movingStart: false,
  movingTarget: false,
  start: { i: 5, j: 5 },
  target: { i: 5, j: 10 },
};

const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case Set_AS_WALL: {
      let graph = state.graph;
      const { i, j } = action.payload;
      if (graph[i][j] != StartNode && graph[i][j] != TargetNode) {
        graph[i][j] = WallTransition;
      }
      return {
        ...state,
        graph,
      };
    }
    case Remove_Wall: {
      let graph = state.graph;
      const { i, j } = action.payload;
      if (graph[i][j] != StartNode && graph[i][j] != TargetNode) {
        graph[i][j] = BlankNode;
      }
      return {
        ...state,
        graph,
      };
    }
    case Fix_AS_WALL: {
      let graph = state.graph;
      const { i, j } = action.payload;
      graph[i][j] = Wall;
      return {
        ...state,
        graph,
      };
    }

    default:
      return state;
  }
};

export default graphReducer;
