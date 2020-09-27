import {
  BlankNode,
  ExploredNode,
  ExploredNodeTransition,
  PathNode,
  PathNodeTransition,
  StartNode,
  TargetNode,
  Wall,
  WallTransition,
} from "./graphStates";

import {
  Clean_Grid,
  Clear_Grid,
  Fix_All_As_Explored,
  Fix_All_As_Path,
  Fix_AS_Explored,
  Fix_As_Path,
  Fix_AS_WALL,
  Move_Start_To,
  Move_Target_To,
  Moving_Start,
  Moving_Target,
  Remove_Wall,
  Set_All_As_Explored,
  Set_All_As_Path,
  Set_AS_Explored,
  Set_As_Path,
  Set_AS_WALL,
  Set_Boundarys,
  Set_Grid,
  Set_Size,
} from "./graphTypes";
let DataSize = 10;
console.log("Initializing data", DataSize);
const Generategraph = (Size) => {
  let ar = [];
  let leng = Size;
  for (let i = 0; i < leng; i++) {
    ar[i] = [];
    for (let j = 0; j < leng; j++) {
      ar[i][j] = BlankNode;
      if (i == 0 || j == 0) {
        ar[i][j] = Wall;
      }
    }
  }
  ar[1][1] = StartNode;
  ar[leng - 1][leng - 1] = TargetNode;
  return ar;
};
let ar = Generategraph(DataSize);
// console.log(ar);
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
  beforeStart: BlankNode,
  beforeTarget: BlankNode,
};

const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case Set_AS_WALL: {
      let newgraph = JSON.parse(JSON.stringify(state.graph));
      const { i, j } = action.payload;
      if (newgraph[i][j] != StartNode && newgraph[i][j] != TargetNode) {
        newgraph[i][j] = WallTransition;
        // graph[i][j] = ExploredNodeTransition;
      } else {
        return state;
      }

      return {
        ...state,
        graph: newgraph,
      };
    }

    case Remove_Wall: {
      let graph = { ...state.graph };
      const { i, j } = action.payload;
      const boundary = state.boundaryWalls;
      if (
        (!(i == 0 || j == 0) || !boundary) &&
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
      let newgraph = JSON.parse(JSON.stringify(state.graph));

      const { i, j } = action.payload;
      if (newgraph[i][j] != StartNode && newgraph[i][j] != TargetNode) {
        newgraph[i][j] = Wall;
        // graph[i][j] = ExploredNode;
        // console.log(neState == state, "state equality");
        return {
          ...state,
          graph: newgraph,
        };
      } else {
        return state;
      }
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
      let graph = JSON.parse(JSON.stringify(state.graph));
      const { i: prevI, j: prevJ } = state.start;
      const { i, j } = action.payload;
      const boundaryWalls = state.boundaryWalls;
      const { beforeStart } = state;
      if (graph[i][j] != TargetNode) {
        graph[prevI][prevJ] = beforeStart;
        const newBeforeStart = graph[i][j];
        graph[i][j] = StartNode;
        return {
          ...state,
          graph,
          start: { i, j },
          beforeStart: newBeforeStart,
        };
      }
      return state;
    }
    case Move_Target_To: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const { i: prevI, j: prevJ } = state.target;
      const { i, j } = action.payload;
      // const { i: startI, j: startJ } = state.start;
      const { beforeTarget } = state;
      if (graph[i][j] != StartNode) {
        graph[prevI][prevJ] = beforeTarget;
        const newBeforeTarget = graph[i][j];
        graph[i][j] = TargetNode;
        return {
          ...state,
          graph,
          target: { i, j },
          beforeTarget: newBeforeTarget,
        };
      }
      return state;
    }

    case Set_Boundarys: {
      let graph = JSON.parse(JSON.stringify(state.graph));
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
      const size = JSON.parse(JSON.stringify(state.graph));
      if (size != action.payload) {
        let ar = Generategraph(action.payload);
        return {
          ...state,
          size: action.payload,
          graph: [...ar],
          boundaryWalls: true,
          start: { i: 1, j: 1 },
          target: { i: ar.length - 1, j: ar.length - 1 },
          beforeStart: BlankNode,
          beforeTarget: BlankNode,
        };
      }
      return state;
    }
    case Clear_Grid: {
      const size = state.size;
      let graph = Generategraph(size);
      return {
        ...state,
        graph: graph,
        boundaryWalls: true,
        start: { i: 1, j: 1 },
        target: { i: ar.length - 1, j: ar.length - 1 },

        beforeStart: BlankNode,
        beforeTarget: BlankNode,
      };
    }
    case Clean_Grid: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph.length; j++) {
          if (graph[i][j] == ExploredNode || graph[i][j] == PathNode) {
            graph[i][j] = BlankNode;
          }
        }
      }

      return {
        ...state,
        graph: graph,
      };
    }
    case Set_Grid: {
      const grid = JSON.parse(JSON.stringify(action.payload));
      return {
        ...state,
        graph: grid,
      };
    }
    case Set_AS_Explored: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const { i, j } = action.payload;
      if (!state.boundaryWalls || !(i == 0 || j == 0)) {
        if (graph[i][j] != StartNode && graph[i][j] != TargetNode) {
          graph[i][j] = ExploredNodeTransition;
          // graph[i][j] = ExploredNodeTransition;
        }
      }
      return {
        ...state,
        graph,
      };
    }
    case Fix_AS_Explored: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const { i, j } = action.payload;
      if (!state.boundaryWalls || !(i == 0 || j == 0)) {
        if (graph[i][j] != StartNode && graph[i][j] != TargetNode) {
          graph[i][j] = ExploredNode;
          // graph[i][j] = ExploredNodeTransition;
        }
      }
      return {
        ...state,
        graph,
      };
    }
    case Set_All_As_Explored: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const arr = action.payload;
      arr.map(({ i, j }) => {
        if (!state.boundaryWalls || !(i == 0 || j == 0)) {
          if (graph[i][j] != StartNode && graph[i][j] != TargetNode) {
            graph[i][j] = ExploredNodeTransition;
            // graph[i][j] = ExploredNodeTransition;
          }
        }
      });
      return {
        ...state,
        graph,
      };
    }
    case Fix_All_As_Explored: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const arr = action.payload;
      arr.map(({ i, j }) => {
        if (!state.boundaryWalls || !(i == 0 || j == 0)) {
          if (graph[i][j] != StartNode && graph[i][j] != TargetNode) {
            graph[i][j] = ExploredNode;
            // graph[i][j] = ExploredNodeTransition;
          }
        }
      });

      return {
        ...state,
        graph,
      };
    }

    case Set_As_Path: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const { i, j } = action.payload;
      if (!state.boundaryWalls || !(i == 0 || j == 0)) {
        if (graph[i][j] != StartNode && graph[i][j] != TargetNode) {
          graph[i][j] = PathNodeTransition;
          // graph[i][j] = ExploredNodeTransition;
        }
      }
      return {
        ...state,
        graph,
      };
    }
    case Fix_As_Path: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const { i, j } = action.payload;
      if (!state.boundaryWalls || !(i == 0 || j == 0)) {
        if (graph[i][j] != StartNode && graph[i][j] != TargetNode) {
          graph[i][j] = PathNode;
          // graph[i][j] = ExploredNodeTransition;
        }
      }
      return {
        ...state,
        graph,
      };
    }
    case Set_All_As_Path: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const arr = action.payload;
      arr.map(({ i, j }) => {
        if (!state.boundaryWalls || !(i == 0 || j == 0)) {
          if (graph[i][j] != StartNode && graph[i][j] != TargetNode) {
            graph[i][j] = PathNodeTransition;
            // graph[i][j] = ExploredNodeTransition;
          }
        }
      });
      return {
        ...state,
        graph,
      };
    }
    case Fix_All_As_Path: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const arr = action.payload;
      arr.map(({ i, j }) => {
        if (!state.boundaryWalls || !(i == 0 || j == 0)) {
          if (graph[i][j] != StartNode && graph[i][j] != TargetNode) {
            graph[i][j] = PathNode;
            // graph[i][j] = ExploredNodeTransition;
          }
        }
      });

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
