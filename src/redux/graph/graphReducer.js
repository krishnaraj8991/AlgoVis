import {
  BlankNode,
  ExploredNode,
  ExploredNodeTransition,
  PathNode,
  PathNodeTransition,
  PortalNode1,
  PortalNode2,
  StartNode,
  TargetNode,
  Wall,
  WallTransition,
} from "./graphStates";

import {
  ActivePortal,
  Clean_Grid,
  Clear_Grid,
  Fix_All_As_Explored,
  Fix_All_As_Path,
  Fix_AS_Explored,
  Fix_As_Path,
  Fix_AS_WALL,
  Move_Portal1_To,
  Move_Portal2_To,
  Move_Start_To,
  Move_Target_To,
  Moving_Portal1,
  Moving_Portal2,
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
  ar[2][2] = PortalNode1;
  ar[leng - 2][leng - 2] = PortalNode2;
  return ar;
};
let ar = Generategraph(DataSize);
// console.log(ar);
// ar[3][3] = 6;
console.log(DataSize);

const initialState = {
  size: DataSize,
  graph: [...ar],

  focusNode: { i: 1, j: 1 },
  boundaryWalls: true,

  // sstart and end
  movingStart: false,
  movingTarget: false,
  start: { i: 1, j: 1 },
  target: { i: ar.length - 1, j: ar.length - 1 },
  beforeStart: BlankNode,
  beforeTarget: BlankNode,

  // portal
  movingPortal1: false,
  movingPortal2: false,
  ActivePortal: true,
  portal1: { i: 2, j: 2 },
  portal2: { i: ar.length - 2, j: ar.length - 2 },
  beforePortal1: BlankNode,
  beforePortal2: BlankNode,
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
      if (
        graph[i][j] != TargetNode &&
        graph[i][j] != PortalNode1 &&
        graph[i][j] != PortalNode2
      ) {
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
      if (
        graph[i][j] != StartNode &&
        graph[i][j] != PortalNode1 &&
        graph[i][j] != PortalNode2
      ) {
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
          portal1: { i: 2, j: 2 },
          portal2: { i: ar.length - 2, j: ar.length - 2 },
          beforePortal1: BlankNode,
          beforePortal2: BlankNode,
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
        portal1: { i: 2, j: 2 },
        portal2: { i: ar.length - 2, j: ar.length - 2 },
        beforePortal1: BlankNode,
        beforePortal2: BlankNode,
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
        if (
          graph[i][j] != StartNode &&
          graph[i][j] != TargetNode &&
          graph[i][j] != PortalNode1 &&
          graph[i][j] != PortalNode2
        ) {
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
        if (
          graph[i][j] != StartNode &&
          graph[i][j] != TargetNode &&
          graph[i][j] != PortalNode1 &&
          graph[i][j] != PortalNode2
        ) {
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
      let focus = state.focusNode;
      arr.map(({ i, j }) => {
        if (!state.boundaryWalls || !(i == 0 || j == 0)) {
          if (
            graph[i][j] != StartNode &&
            graph[i][j] != TargetNode &&
            graph[i][j] != PortalNode1 &&
            graph[i][j] != PortalNode2
          ) {
            graph[i][j] = ExploredNodeTransition;
            // graph[i][j] = ExploredNodeTransition;
            focus = { i, j };
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
          if (
            graph[i][j] != StartNode &&
            graph[i][j] != TargetNode &&
            graph[i][j] != PortalNode1 &&
            graph[i][j] != PortalNode2
          ) {
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
        if (
          graph[i][j] != StartNode &&
          graph[i][j] != TargetNode &&
          graph[i][j] != PortalNode1 &&
          graph[i][j] != PortalNode2
        ) {
          graph[i][j] = PathNodeTransition;
          // graph[i][j] = ExploredNodeTransition;
        }
      }
      console.log(state.focusNode);
      return {
        ...state,
        graph,
        focusNode: { i, j },
      };
    }
    case Fix_As_Path: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const { i, j } = action.payload;
      let focus = state.focusNode;
      if (!state.boundaryWalls || !(i == 0 || j == 0)) {
        if (
          graph[i][j] != StartNode &&
          graph[i][j] != TargetNode &&
          graph[i][j] != PortalNode1 &&
          graph[i][j] != PortalNode2
        ) {
          graph[i][j] = PathNode;
          // graph[i][j] = ExploredNodeTransition;
          focus = { i, j };
        }
      }
      return {
        ...state,
        graph,
        focusNode: focus,
      };
    }
    case Set_All_As_Path: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const arr = action.payload;

      arr.map(({ i, j }) => {
        if (!state.boundaryWalls || !(i == 0 || j == 0)) {
          if (
            graph[i][j] != StartNode &&
            graph[i][j] != TargetNode &&
            graph[i][j] != PortalNode1 &&
            graph[i][j] != PortalNode2
          ) {
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
      let focus = state.focusNode;
      console.log("Fixing path");
      arr.map(({ i, j }) => {
        if (!state.boundaryWalls || !(i == 0 || j == 0)) {
          if (
            graph[i][j] != StartNode &&
            graph[i][j] != TargetNode &&
            graph[i][j] != PortalNode1 &&
            graph[i][j] != PortalNode2
          ) {
            graph[i][j] = PathNode;
            focus = { i, j };
            // graph[i][j] = ExploredNodeTransition;
          }
        }
      });

      return {
        ...state,
        graph,
        focusNode: focus,
      };
    }
    case Moving_Portal1: {
      return {
        ...state,
        movingPortal1: action.payload,
      };
    }
    case Moving_Portal2: {
      return {
        ...state,
        movingPortal2: action.payload,
      };
    }
    case Move_Portal1_To: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const { i: prevI, j: prevJ } = state.portal1;
      const { i, j } = action.payload;
      const { beforePortal1 } = state;
      if (
        graph[i][j] != TargetNode &&
        graph[i][j] != StartNode &&
        graph[i][j] != PortalNode2
      ) {
        graph[prevI][prevJ] = beforePortal1;
        const newBeforePortal1 = graph[i][j];
        graph[i][j] = PortalNode1;
        return {
          ...state,
          graph,
          portal1: { i, j },
          beforePortal1: newBeforePortal1,
        };
      }
      return state;
    }
    case Move_Portal2_To: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const { i: prevI, j: prevJ } = state.portal2;
      const { i, j } = action.payload;
      const { beforePortal2 } = state;
      if (
        graph[i][j] != TargetNode &&
        graph[i][j] != StartNode &&
        graph[i][j] != PortalNode1
      ) {
        graph[prevI][prevJ] = beforePortal2;
        const newBeforePortal2 = graph[i][j];
        graph[i][j] = PortalNode2;
        return {
          ...state,
          graph,
          portal2: { i, j },
          beforePortal2: newBeforePortal2,
        };
      }
      return state;
    }
    case ActivePortal: {
      let graph = JSON.parse(JSON.stringify(state.graph));
      const ActivePortal = state.ActivePortal;
      let { i: p1i, j: p1j } = state.portal1;
      let { i: p2i, j: p2j } = state.portal2;
      let beforePortal1 = state.beforePortal1;
      let beforePortal2 = state.beforePortal2;
      // console.log(graph, p1i, p1j);
      if (ActivePortal) {
        graph[p1i][p1j] = beforePortal1;
        graph[p2i][p2j] = beforePortal2;
      } else {
        while (
          (p1i == state.start.i && p1j == state.start.j) ||
          (p1i == state.target.i && p1j == state.target.j)
        ) {
          p1i = (p1i + 1) % state.size;
        }
        while (
          (p2i == state.start.i && p2j == state.start.j) ||
          (p2i == state.target.i && p2j == state.target.j)
        ) {
          p2i = (p2i + 1) % state.size;
        }
        beforePortal1 = graph[p1i][p1j];
        beforePortal2 = graph[p2i][p2j];
        graph[p1i][p1j] = PortalNode1;
        graph[p2i][p2j] = PortalNode2;
      }
      return {
        ...state,
        graph: graph,
        ActivePortal: !state.ActivePortal,
        portal1: { i: p1i, j: p1j },
        portal2: { i: p2i, j: p2j },
        beforePortal1,
        beforePortal2,
      };
    }
    default:
      return state;
  }
};

export default graphReducer;
