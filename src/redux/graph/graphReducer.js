import {
  BlankNode,
  StartNode,
  TargetNode,
  Wall,
  WallTransition,
} from "./graphStates";

import {
  Fix_AS_WALL,
  Move_Start_To,
  Move_Target_To,
  Moving_Start,
  Moving_Target,
  Remove_Wall,
  Set_AS_WALL,
  Set_Boundarys,
  Set_Size,
} from "./graphTypes";

let DataSize = 40;
console.log("Initializing data", DataSize);
const Generategraph = (Size) => {
  let ar = [];
  let leng = Size;
  for (let i = 0; i < leng; i++) {
    ar[i] = [];
    for (let j = 0; j < leng; j++) {
      ar[i][j] = 1;
      if (i == 0 || j == 0) {
        ar[i][j] = 0;
      }
    }
  }
  ar[1][1] = StartNode;
  ar[ar.length - 1][ar.length - 1] = TargetNode;
  return ar;
};
let ar = Generategraph(DataSize);

// ar[3][3] = 6;
console.log(DataSize);

const initialState = {
  size: DataSize,
  graph: [...ar],
  movingStart: false,
  movingTarget: false,
  start: { i: 1, j: 1 },
  target: { i: ar.length - 1, j: ar.length - 1 },
  boundaryWalls: true,
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
      if (
        !(i == 0 || j == 0) &&
        graph[i][j] != StartNode &&
        graph[i][j] != TargetNode
      ) {
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

    case Moving_Start: {
      return {
        ...state,
        movingStart: action.payload,
      };
    }
    case Moving_Target: {
      return {
        ...state,
        movingTarget: action.payload,
      };
    }
    case Move_Start_To: {
      let graph = state.graph;
      const { i: prevI, j: prevJ } = state.start;
      const { i, j } = action.payload;
      const boundaryWalls = state.boundaryWalls;
      if (graph[i][j] != TargetNode) {
        if (boundaryWalls && (prevI == 0 || prevJ == 0)) {
          graph[prevI][prevJ] = Wall;
        } else {
          graph[prevI][prevJ] = BlankNode;
        }
        graph[i][j] = StartNode;
        return {
          ...state,
          graph,
          start: { i, j },
        };
      }
      return state;
    }
    case Move_Target_To: {
      let graph = state.graph;
      const { i: prevI, j: prevJ } = state.target;
      const { i, j } = action.payload;
      const { i: startI, j: startJ } = state.start;
      const boundaryWalls = state.boundaryWalls;
      if (graph[i][j] != StartNode) {
        if (boundaryWalls && (prevI == 0 || prevJ == 0)) {
          graph[prevI][prevJ] = Wall;
        } else {
          graph[prevI][prevJ] = BlankNode;
        }
        graph[i][j] = TargetNode;
        return {
          ...state,
          graph,
          target: { i, j },
        };
      }
      return state;
    }

    case Set_Boundarys: {
      let graph = state.graph;
      const boundary = state.boundaryWalls;
      for (let i = 0; i < state.size; i++) {
        graph[0][i] = boundary ? BlankNode : Wall;
        graph[i][0] = boundary ? BlankNode : Wall;
      }
      return {
        ...state,
        graph: graph,
        boundaryWalls: !state.boundaryWalls,
      };
    }
    case Set_Size: {
      const size = state.size;
      if (size != action.payload) {
        let ar = Generategraph(action.payload);
        return {
          ...state,
          size: action.payload,
          graph: [...ar],
          start: { i: 1, j: 1 },
          target: { i: ar.length - 1, j: ar.length - 1 },
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default graphReducer;
