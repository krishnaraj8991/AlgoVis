import { Switch } from "@material-ui/core";

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
  const PortalNode1 = 9;
  const PortalNode2 = 10;

  // NoNode
  const NoNode = -1;
  // ----------------------------------------------------------------

  // State
  let state;
  let interval;
  let animate = false;
  let AlgoStartTime = null;
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
  // sleep for animation
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  const pause = () => {
    const currenttime = Date.now();
    if (currenttime - AlgoStartTime < 20000) {
      sleep(70);
    } else if (currenttime - AlgoStartTime < 40000) {
      sleep(10);
    }
  };
  // Shuffel
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  // returns an array of 6 neighbours;
  const GetNeighbours = ({ i, j, length }) => {
    const portal1 = state.graph.portal1;
    const portal2 = state.graph.portal2;
    const portalavailable = state.graph.ActivePortal;
    if (portalavailable) {
      if (i == portal1.i && j == portal1.j) {
        i = portal2.i;
        j = portal2.j;
        // console.log(CurrentNode, "portal");
      } else if (i == portal2.i && j == portal2.j) {
        // console.log({ i, j }, "this");
        i = portal1.i;
        j = portal1.j;
        // console.log({ i, j }, "to this");
      }
    }
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

  // Iterative Version of DFS
  const DepthFirstSearchIterative = () => {
    const graph = state.graph.graph;
    const length = state.graph.size;
    const start = state.graph.start;
    const target = state.graph.target;
    let stack = [start];
    let skip = false;
    while (stack.length != 0) {
      skip = false;
      let CurrentNode = stack[stack.length - 1];
      if (CurrentNode.i == target.i && CurrentNode.j == target.j) {
        return {
          FinalPath: stack,
          isFinalPath: stack.length != 0,
        };
      }
      let neighbours = GetNeighbours({ ...CurrentNode, length });
      neighbours = shuffle(neighbours);

      neighbours.forEach((node, idx) => {
        const { i, j } = node;
        // console.log(node);
        if (!skip) {
          if (graph[i][j] != ExploredNode && graph[i][j] != Wall) {
            if (
              graph[i][j] != StartNode &&
              graph[i][j] != TargetNode &&
              graph[i][j] != PortalNode1 &&
              graph[i][j] != PortalNode2
            ) {
              graph[i][j] = ExploredNode;
            }
            if (!stack.some((item) => item.i == node.i && item.j == node.j)) {
              stack.push(node);

              skip = true;
              if (animate) {
                let arr = [node];
                postMessage({
                  type: SetExploredNodes,
                  payload: JSON.stringify({ arr }),
                });

                pause();
              }
            }
          }
        }
      });
      if (!skip) {
        stack.pop();
      }
    }
    return {
      FinalPath: stack,
      isFinalPath: stack.length != 0,
    };
  };
  const BreathFirstSearch = () => {
    const graph = state.graph.graph;
    const distanceMap = [];
    const length = state.graph.size;

    // distanceMap.map((row) => {
    //   return row.map((cell) => -1);
    // });
    for (let i = 0; i < length; i++) {
      let row = [];
      for (let j = 0; j < length; j++) {
        row.push({ i: -1, j: -1 });
      }
      distanceMap.push([...row]);
    }
    const start = state.graph.start;
    const target = state.graph.target;
    let Completed = false;
    let queue = [start];
    distanceMap[start.i][start.j] = start;
    const portal1 = state.graph.portal1;
    const portal2 = state.graph.portal2;

    while (queue.length != 0 && !Completed) {
      // console.log(queue);

      let CurrentNode = queue.shift();

      if (CurrentNode.i == target.i && CurrentNode.j == target.j) {
        Completed = true;
      } else {
        if (animate) {
          let arr = [CurrentNode];
          postMessage({
            type: SetExploredNodes,
            payload: JSON.stringify({ arr }),
          });
          pause();
        }

        const neighbours = GetNeighbours({ ...CurrentNode, length });
        // console.log(neighbours);
        neighbours.forEach(({ i, j }, idx) => {
          if (graph[i][j] != ExploredNode && graph[i][j] != Wall) {
            if (
              graph[i][j] != StartNode &&
              graph[i][j] != TargetNode &&
              graph[i][j] != PortalNode1 &&
              graph[i][j] != PortalNode2
            ) {
              graph[i][j] = ExploredNode;
            }
            if (distanceMap[i][j].i == -1) {
              distanceMap[i][j] = CurrentNode;
            }

            queue.push({ i, j });
          }
        });
      }
    }
    let CurrentNode = distanceMap[target.i][target.j];
    let FinalPath = [];
    // distance = distanceMap[CurrentNode.i][CurrentNode.j];
    // console.log(distanceMap);
    let Break = true;
    let PreviousNode = { i: -1, j: -1 };
    while (
      !(CurrentNode.i == PreviousNode.i && CurrentNode.j == PreviousNode.j)
    ) {
      FinalPath.unshift(CurrentNode);
      PreviousNode.i = CurrentNode.i;
      PreviousNode.j = CurrentNode.j;
      CurrentNode = distanceMap[CurrentNode.i][CurrentNode.j];
    }

    return { FinalPath, isFinalPath: FinalPath.length != 0 };
  };

  const GetDistance = ({ i, j }) => {
    const target = state.graph.target;
    const start = state.graph.start;
    const fh = Math.abs(start.i - i) + Math.abs(start.j - j);
    const boundary = state.graph.boundary;
    const size = state.graph.size;
    // const fh = 0;
    let gh = Math.sqrt((target.i - i) ** 2 + (target.j - j) ** 2);
    let othergh = -1;
    if (!boundary) {
      othergh = Math.sqrt(
        (target.i - i + size) ** 2 + (target.j - j + size) ** 2
      );
      // console.log(gh, othergh);
      gh = Math.min(gh, othergh);
    }
    return fh + gh * 2;
  };
  const MinhuristicValue = (queue) => {
    let min = -1;
    let minNode = { i: 0, j: 0 };
    queue.forEach((node) => {
      let distance = GetDistance(node);
      if (distance < min || min == -1) {
        min = distance;
        minNode = node;
      }
    });
    return minNode;
  };
  const Astart = () => {
    const graph = state.graph.graph;
    const distanceMap = [];
    const length = state.graph.size;

    // distanceMap.map((row) => {
    //   return row.map((cell) => -1);
    // });
    for (let i = 0; i < length; i++) {
      let row = [];
      for (let j = 0; j < length; j++) {
        row.push({ i: -1, j: -1 });
      }
      distanceMap.push([...row]);
    }
    const start = state.graph.start;
    const target = state.graph.target;
    let Completed = false;
    let queue = [start];
    distanceMap[start.i][start.j] = start;
    const portal1 = state.graph.portal1;
    const portal2 = state.graph.portal2;

    while (queue.length != 0 && !Completed) {
      // console.log(queue);

      // let CurrentNode = queue.shift();
      let CurrentNode = MinhuristicValue(queue);
      queue = queue.filter((node) => {
        return node.i != CurrentNode.i || node.j != CurrentNode.j;
      });
      if (CurrentNode.i == target.i && CurrentNode.j == target.j) {
        Completed = true;
      } else {
        if (animate) {
          let arr = [CurrentNode];
          postMessage({
            type: SetExploredNodes,
            payload: JSON.stringify({ arr }),
          });
          pause();
        }
        // graph[CurrentNode.i][CurrentNode.j] = ExploredNode;

        const neighbours = GetNeighbours({ ...CurrentNode, length });
        // console.log(neighbours);
        neighbours.forEach(({ i, j }, idx) => {
          if (graph[i][j] != ExploredNode && graph[i][j] != Wall) {
            // if (!queue.includes({ i, j }) && graph[i][j] != Wall) {
            if (
              graph[i][j] != StartNode &&
              graph[i][j] != TargetNode &&
              graph[i][j] != PortalNode1 &&
              graph[i][j] != PortalNode2
            ) {
              graph[i][j] = ExploredNode;
            }
            if (distanceMap[i][j].i == -1) {
              distanceMap[i][j] = CurrentNode;
            }

            queue.push({ i, j });
          }
        });
      }
    }
    let CurrentNode = distanceMap[target.i][target.j];
    let FinalPath = [];
    // distance = distanceMap[CurrentNode.i][CurrentNode.j];
    // console.log(distanceMap);
    let Break = true;
    let PreviousNode = { i: -1, j: -1 };
    while (
      !(CurrentNode.i == PreviousNode.i && CurrentNode.j == PreviousNode.j)
    ) {
      FinalPath.unshift(CurrentNode);
      PreviousNode.i = CurrentNode.i;
      PreviousNode.j = CurrentNode.j;
      CurrentNode = distanceMap[CurrentNode.i][CurrentNode.j];
    }

    return { FinalPath, isFinalPath: FinalPath.length != 0 };
  };

  const GreedyGetDistance = ({ i, j }) => {
    const target = state.graph.target;
    const start = state.graph.start;
    // const fh = Math.abs(start.i - i) + Math.abs(start.j - j);
    const boundary = state.graph.boundary;
    const size = state.graph.size;
    // const fh = 0;
    let gh = Math.sqrt((target.i - i) ** 2 + (target.j - j) ** 2);
    let othergh = -1;
    if (!boundary) {
      othergh = Math.sqrt(
        (target.i - i + size) ** 2 + (target.j - j + size) ** 2
      );
      // console.log(gh, othergh);
      gh = Math.min(gh, othergh);
    }
    return gh;
  };
  const GreedyMinhuristicValue = (queue) => {
    let min = -1;
    let minNode = { i: 0, j: 0 };
    queue.forEach((node) => {
      let distance = GreedyGetDistance(node);
      if (distance < min || min == -1) {
        min = distance;
        minNode = node;
      }
    });
    return minNode;
  };
  const GreedyBFS = () => {
    const graph = state.graph.graph;
    const distanceMap = [];
    const length = state.graph.size;

    // distanceMap.map((row) => {
    //   return row.map((cell) => -1);
    // });
    for (let i = 0; i < length; i++) {
      let row = [];
      for (let j = 0; j < length; j++) {
        row.push({ i: -1, j: -1 });
      }
      distanceMap.push([...row]);
    }
    const start = state.graph.start;
    const target = state.graph.target;
    let Completed = false;
    let queue = [start];
    distanceMap[start.i][start.j] = start;
    const portal1 = state.graph.portal1;
    const portal2 = state.graph.portal2;

    while (queue.length != 0 && !Completed) {
      // console.log(queue);

      // let CurrentNode = queue.shift();
      let CurrentNode = GreedyMinhuristicValue(queue);
      queue = queue.filter((node) => {
        return node.i != CurrentNode.i || node.j != CurrentNode.j;
      });
      if (CurrentNode.i == target.i && CurrentNode.j == target.j) {
        Completed = true;
      } else {
        if (animate) {
          let arr = [CurrentNode];
          postMessage({
            type: SetExploredNodes,
            payload: JSON.stringify({ arr }),
          });
          pause();
        }
        // graph[CurrentNode.i][CurrentNode.j] = ExploredNode;

        const neighbours = GetNeighbours({ ...CurrentNode, length });
        // console.log(neighbours);
        neighbours.forEach(({ i, j }, idx) => {
          if (graph[i][j] != ExploredNode && graph[i][j] != Wall) {
            // if (!queue.includes({ i, j }) && graph[i][j] != Wall) {
            if (
              graph[i][j] != StartNode &&
              graph[i][j] != TargetNode &&
              graph[i][j] != PortalNode1 &&
              graph[i][j] != PortalNode2
            ) {
              graph[i][j] = ExploredNode;
            }
            if (distanceMap[i][j].i == -1) {
              distanceMap[i][j] = CurrentNode;
            }

            queue.push({ i, j });
          }
        });
      }
    }
    let CurrentNode = distanceMap[target.i][target.j];
    let FinalPath = [];
    // distance = distanceMap[CurrentNode.i][CurrentNode.j];
    // console.log(distanceMap);
    let Break = true;
    let PreviousNode = { i: -1, j: -1 };
    while (
      !(CurrentNode.i == PreviousNode.i && CurrentNode.j == PreviousNode.j)
    ) {
      FinalPath.unshift(CurrentNode);
      PreviousNode.i = CurrentNode.i;
      PreviousNode.j = CurrentNode.j;
      CurrentNode = distanceMap[CurrentNode.i][CurrentNode.j];
    }

    return { FinalPath, isFinalPath: FinalPath.length != 0 };
  };
  const ExploreGraphAnimate = () => {
    const graph = state.graph.graph;
    const length = state.graph.size;
    AlgoStartTime = Date.now();
    const Algo = state.theme.algo;
    const portal1 = state.graph.portal1;
    const portal2 = state.graph.portal2;
    // console.log(portal1, portal2);
    animate = true;
    let FinalPath = [];
    let isFinalPath = false;
    switch (Algo) {
      case "Astar": {
        const { FinalPath: path, isFinalPath: ispath } = Astart();
        FinalPath = path;
        isFinalPath = ispath;
        break;
      }
      case "BFS": {
        const { FinalPath: path, isFinalPath: ispath } = BreathFirstSearch();
        FinalPath = path;
        isFinalPath = ispath;
        break;
      }
      case "DFS": {
        const {
          FinalPath: path,
          isFinalPath: ispath,
        } = DepthFirstSearchIterative();
        FinalPath = path;
        isFinalPath = ispath;
        break;
      }
      case "GreedyBFS": {
        const { FinalPath: path, isFinalPath: ispath } = GreedyBFS();
        FinalPath = path;
        isFinalPath = ispath;
        break;
      }
    }

    animate = false;
    let index = 0;
    let flag = 0;
    if (isFinalPath) {
      let idx = 0;
      if (FinalPath.length < 20) {
        while (idx < FinalPath.length) {
          let arr = [FinalPath[idx]];
          postMessage({
            type: SetFinalPath,
            payload: JSON.stringify({ arr }),
          });
          pause();
          idx++;
        }
      } else {
        postMessage({
          type: SetFinalPath,
          payload: JSON.stringify({ arr: FinalPath }),
        });
      }
    }
  };
  const ExploreGraphInstantaly = () => {
    const graph = state.graph.graph;
    const length = state.graph.size;
    // const { FinalPath, isFinalPath } = DepthFirstSearchIterative();
    // const { FinalPath, isFinalPath } = BreathFirstSearch();
    // const { FinalPath, isFinalPath } = Astart();
    let FinalPath = [];
    let isFinalPath = false;
    const Algo = state.theme.algo;

    switch (Algo) {
      case "Astar": {
        const { FinalPath: path, isFinalPath: ispath } = Astart();
        FinalPath = path;
        isFinalPath = ispath;
        break;
      }
      case "BFS": {
        const { FinalPath: path, isFinalPath: ispath } = BreathFirstSearch();
        FinalPath = path;
        isFinalPath = ispath;
        break;
      }
      case "DFS": {
        const {
          FinalPath: path,
          isFinalPath: ispath,
        } = DepthFirstSearchIterative();
        FinalPath = path;
        isFinalPath = ispath;
        break;
      }
      case "GreedyBFS": {
        const { FinalPath: path, isFinalPath: ispath } = GreedyBFS();
        FinalPath = path;
        isFinalPath = ispath;
        break;
      }
    }
    if (isFinalPath) {
      FinalPath.map(({ i, j }) => {
        if (
          graph[i][j] != StartNode &&
          graph[i][j] != TargetNode &&
          graph[i][j] != PortalNode1 &&
          graph[i][j] != PortalNode2
        ) {
          graph[i][j] = PathNode;
        }
      });
    }

    postMessage({
      type: FixGrid,
      payload: JSON.stringify(graph),
    });
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
        postMessage({
          type: FixGrid,
          payload: JSON.stringify(state.graph.graph),
        });
        postMessage({ type: ConsoleLog, payload: "Started Algo" });
        // ClearGrid();
        ExploreGraphAnimate();
        return;
      case InstantAlgo:
        state = JSON.parse(payload);
        state.graph.graph[state.graph.start.i][state.graph.start.j] = StartNode;
        state.graph.graph[state.graph.target.i][
          state.graph.target.j
        ] = TargetNode;
        // console.log(
        //   state.graph.graph[state.graph.target.i][state.graph.target.j]
        // );
        postMessage({ type: ConsoleLog, payload: "Instant Algo Called" });
        CleanGrid();
        ExploreGraphInstantaly();
        postMessage({ type: ConsoleLog, payload: "Algo Completed" });
        // postMessage({ type: ConsoleLog, payload: "Stop Algo" });
        // postMessage({ type: Finished, payload: "Finished Algo" });
        return;
      case Stop:
        animate = false;
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
