export default function Worker() {
  // MessageType for Workers
  const CurrentState = "CurrentState";
  const ConsoleLog = "ConsoleLog";
  const CheckState = "CheckState";
  const SetExploredNodes = "SetExploredNodes";
  const FixExploredNodes = "FixExploredNodes";
  const Start = "Start";
  const Stop = "Stop";
  const Finished = "Finished";
  const InstantAlgo = "InstantAlgo";
  const SetFinalPath = "SetFinalPath";
  const FixFinalPath = "FixFinalPath";
  const FixGrid = "FixGrid";
  // Graph States
  // ----------------------------------------------------------------
  const BlankNode = 0;
  // Wall and transition
  const Wall = 1;
  const WallTransition = 2;
  // Start and end Node
  const StartNode = 3;
  const TargetNode = 4;
  // Explored Node and Transition
  const ExploredNode = 5;
  const ExploredNodeTransition = 6;
  // Final Path Node
  const PathNode = 7;
  const PathNodeTransition = 8;
  // Portal Node
  const PortalNode = 9;
  // NoNode
  const NoNode = -1;
  // ----------------------------------------------------------------

  // State
  let state;
  let interval;
  // ClearGrid
  const CleanGrid = () => {
    const size = state.graph.size;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (
          state.graph.graph[i][j] == ExploredNode ||
          state.graph.graph[i][j] == PathNode ||
          state.graph.graph[i][j] == PathNodeTransition
        ) {
          state.graph.graph[i][j] = BlankNode;
        }
      }
    }
  };
  // returns an array of 6 neighbours;
  const GetNeighbours = ({ i, j, length }) => {
    let neighbours = [];
    neighbours.push({ i, j: (j + length - 1) % length });
    neighbours.push({ i, j: (j + 1) % length });
    neighbours.push({ i: (i + length - 1) % length, j });
    neighbours.push({ i: (i + 1) % length, j });

    if (i % 2 != 0) {
      neighbours.push({
        i: (i + length - 1) % length,
        j: (j + length - 1) % length,
      });
      neighbours.push({
        i: (i + length + 1) % length,
        j: (j + length - 1) % length,
      });
    } else {
      neighbours.push({
        i: (i + length - 1) % length,
        j: (j + length + 1) % length,
      });
      neighbours.push({
        i: (i + length + 1) % length,
        j: (j + length + 1) % length,
      });
    }

    return neighbours;
  };

  // RecersiveSearch for DFS
  const RecersiveSearch = (CurrentNode, ExploredNodes, graph) => {
    if (
      CurrentNode.i == state.graph.target.i &&
      CurrentNode.j == state.graph.target.j
    ) {
      return [CurrentNode];
    }

    ExploredNodes.push(CurrentNode);
    if (
      graph[CurrentNode.i][CurrentNode.j] != StartNode &&
      graph[CurrentNode.i][CurrentNode.j] != TargetNode
    ) {
      graph[CurrentNode.i][CurrentNode.j] = ExploredNode;
    }
    const neighbours = GetNeighbours({
      ...CurrentNode,
      length: state.graph.size,
    });
    neighbours.sort(() => Math.random - 0.5);
    // let path = [];
    for (let k = 0; k < 6; k++) {
      const { i, j } = neighbours[k];
      if (graph[i][j] != ExploredNode && graph[i][j] != Wall) {
        const path = [...RecersiveSearch(neighbours[k], ExploredNodes, graph)];
        if (path.length != 0) {
          return [CurrentNode, ...path];
        }
      }
    }
    return [];
    // const path = neighbours.map((node) => {
    //   // console.log(i, j);
    // });
    // return path;
  };
  // DepthFirstSearch Algo
  const dephtFirstSearch = () => {
    const graph = state.graph.graph;
    const length = state.graph.size;
    console.log(length);
    const StartNode = state.graph.start;
    const targetNode = state.graph.target;
    let ExploredNodes = [];
    const Path = [...RecersiveSearch(StartNode, ExploredNodes, graph)];
    return {
      ExploredNodes: ExploredNodes,
      FinalPath: Path,
      isFinalPath: Path.length != 0,
    };
  };
  const ExploreGraphAnimate = () => {
    const graph = state.graph.graph;
    const length = state.graph.size;

    // const neighbours = GetNeighbours({ ...state.graph.start, length });
    // neighbours.map((node) => {
    //   let arr = [node];
    //   postMessage({
    //     type: SetExploredNodes,
    //     payload: JSON.stringify({ arr }),
    //   });
    // });
    // postMessage({ type: Stop, payload: "Stop Algo" });
    const { ExploredNodes, FinalPath, isFinalPath } = dephtFirstSearch();
    let index = 0;
    let flag = 0;
    interval = setInterval(() => {
      let arr = [];
      if (flag == 0) {
        if (index < ExploredNodes.length) {
          arr.push(ExploredNodes[index]);
          postMessage({
            type: SetExploredNodes,
            payload: JSON.stringify({ arr }),
          });
        } else {
          flag++;
          index = 0;
        }
      } else if (flag == 1) {
        if (isFinalPath) {
          // console.log("Sending Final path", FinalPath.length);
          if (index < FinalPath.length) {
            arr.push(FinalPath[index]);
            postMessage({
              type: SetFinalPath,
              payload: JSON.stringify({ arr }),
            });
          } else {
            flag++;
          }
        } else {
          flag++;
        }
      } else {
        clearInterval(interval);
      }
      index++;
    }, 100);
  };
  const ExploreGraphInstantaly = () => {
    const graph = state.graph.graph;
    const length = state.graph.size;

    // const neighbours = GetNeighbours({ ...state.graph.start, length });
    // neighbours.map((node) => {
    //   let arr = [node];
    //   postMessage({
    //     type: SetExploredNodes,
    //     payload: JSON.stringify({ arr }),
    //   });
    // });
    // postMessage({ type: Stop, payload: "Stop Algo" });

    const { ExploredNodes, FinalPath, isFinalPath } = dephtFirstSearch();
    // console.log("FinalPath", FinalPath);
    ExploredNodes.map(({ i, j }) => {
      if (graph[i][j] != StartNode && graph[i][j] != TargetNode) {
        graph[i][j] = ExploredNode;
      }
    });

    // postMessage({
    //   type: FixExploredNodes,
    //   payload: JSON.stringify({ arr: ExploredNodes }),
    // });
    if (isFinalPath) {
      FinalPath.map(({ i, j }) => {
        if (graph[i][j] != StartNode && graph[i][j] != TargetNode) {
          graph[i][j] = PathNode;
        }
      });
      // postMessage({
      //   type: FixFinalPath,
      //   payload: JSON.stringify({ arr: FinalPath }),
      // });
    }

    postMessage({
      type: FixGrid,
      payload: JSON.stringify(graph),
    });

    // let i = 2;
    // let j = 2;
    // let x = 0;
    // let arr = [];
    // while (i < graph.length) {
    //   if (state.graph.graph[x][j] != 1) {
    //     arr.push({ i: x, j });
    //   }
    //   if (state.graph.graph[i][x] != 1) {
    //     arr.push({ i, j: x });
    //   }
    //   if (x == i) {
    //     i += 1;
    //     j += 1;
    //     x = 0;
    //   } else {
    //     x++;
    //   }
    // }
    // postMessage({
    //   type: FixExploredNodes,
    //   payload: JSON.stringify({ arr }),
    // });
  };

  const Bridge = (action) => {
    // eslint-disable-line no-restricted-globals
    if (!action) return;
    const { type, payload } = action.data;
    switch (type) {
      case "Hello":
        postMessage({ type: "Hello", payload: "Hello From Worker" });
        return;
      case CurrentState:
        state = JSON.parse(payload);
        return;
      case Start:
        state = JSON.parse(payload);
        CleanGrid();
        postMessage({ type: ConsoleLog, payload: "Started Algo" });
        // ClearGrid();
        ExploreGraphAnimate();
        return;
      case InstantAlgo:
        state = JSON.parse(payload);
        postMessage({ type: ConsoleLog, payload: "Instant Algo Called" });
        CleanGrid();
        ExploreGraphInstantaly();
        postMessage({ type: ConsoleLog, payload: "Algo Completed" });
        // postMessage({ type: ConsoleLog, payload: "Stop Algo" });
        // postMessage({ type: Finished, payload: "Finished Algo" });
        return;
      case Stop:
        clearInterval(interval);
        postMessage({ type: ConsoleLog, payload: "Stop Algo" });
        postMessage({ type: Stop, payload: "Stop Algo" });
        return;
      case ConsoleLog:
        postMessage({ type: ConsoleLog, payload: "Received Log" });
        return;
      default:
        return;
    }
  };

  this.addEventListener("message", Bridge);
}
