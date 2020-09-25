export default function Worker() {
  // MessageType for Workers
  const CurrentState = "CurrentState";
  const ConsoleLog = "ConsoleLog";
  const CheckState = "CheckState";
  const SetExploredNodes = "SetExploredNodes";
  const Start = "Start";
  const Stop = "Stop";
  // State
  let state;
  let interval;
  const ExploreGraph = () => {
    const graph = state.graph.graph;
    let i = 2;
    let j = 2;
    let prevarr = [];
    interval = setInterval(() => {
      let arr = [];
      for (let x = 0; x <= i; x++) {
        arr.push({ i: x, j });
        arr.push({ i, j: x });
      }
      postMessage({
        type: SetExploredNodes,
        payload: JSON.stringify({ arr, prevarr }),
      });
      i += 1;
      j += 1;
      prevarr = arr;
      if (i == graph.length) {
        clearInterval(interval);
      }
    }, 600);
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
        // postMessage({
        //   type: CheckState,
        //   payload: JSON.stringify({ msg: "Received State", state: state }),
        // });
        return;
      case Start:
        postMessage({ type: ConsoleLog, payload: "Started Algo" });
        ExploreGraph();
        return;
      case Stop:
        clearInterval(interval);
        postMessage({ type: ConsoleLog, payload: "Stop Algo" });
        postMessage({ type: Stop, payload: "Stop Algo" });
      case ConsoleLog:
        postMessage({ type: ConsoleLog, payload: "Received Log" });
        return;
      default:
        return;
    }
  };

  this.addEventListener("message", Bridge);
}
