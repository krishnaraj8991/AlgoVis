import React, { useEffect, useRef, useState } from "react";
import {
  Provider,
  useDispatch,
  connect,
  useSelector,
  shallowEqual,
} from "react-redux";

import NevBar from "./NevBars/NevBar";
import NevItem from "./NevBars/NevItem";

import DropdownMenu from "./NevBars/DropdownMenu";
import Hive from "./components/Hive/Hive";
import styled, { ThemeProvider, css } from "styled-components";
import TheamSwitcher from "./components/TheamSwitcher";
// Store
import store from "./redux/store";
import PlayPause from "./NevBars/PlayPause";
import SideMenu from "./NevBars/SideMenu";
import GridSize from "./NevBars/GridSize";

import {
  CleanGrid,
  ClearGrid,
  FixAllAsExplored,
  FixAllAsPath,
  FixAsExplored,
  SetAllAsExplored,
  SetALLAsPath,
  SetAsExplored,
  SetGrid,
} from "./redux/graph/graphActions";
// import workerCom from "./WebWorkers/workerCom";
// import WebWorker from "./WebWorkers/workerSetup";

// Import your worker

import worker from "workerize-loader!./WebWorkers/workerCom"; // eslint-disable-line import/no-webpack-loader-syntax

import {
  CurrentState,
  ConsoleLog,
  CheckState,
  SetExploredNodes,
  Start,
  Stop,
  Finished,
  InstantAlgo,
  FixExploredNodes,
  SetFinalPath,
  FixFinalPath,
  FixGrid,
} from "./WebWorkers/MessageTypes";
import { PlayPauseAction } from "./redux/themeState/themeActions";
// const workerInstance = new WebWorker(workerCom);
const workerInstance = worker();
function WorkerContainer() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const animation = useRef(null);
  const AnimationSpeed = useRef(null);
  AnimationSpeed.current = useSelector(
    (state) => state.theme.animationSpeed,
    shallowEqual
  );
  animation.current = useSelector(
    (state) => state.theme.animation,
    shallowEqual
  );
  const PlaypauseState = useSelector((state) => state.theme.playpause);
  const { start, target } = useSelector((state) => ({
    start: state.graph.start,
    target: state.graph.target,
  }));
  const Moving = useSelector((state) => {
    return (
      state.graph.movingStart ||
      state.graph.movingTarget ||
      state.graph.movingPortal1 ||
      state.graph.movingPortal2
    );
  });
  const ActivePortal = useSelector((state) => state.graph.ActivePortal);
  const lastarr = useRef(null);
  useEffect(() => {
    workerInstance.addEventListener("message", (action) => {
      const { type, payload } = action.data;
      switch (type) {
        case "Hello": {
          console.log(payload);
          break;
        }
        case ConsoleLog: {
          console.log(payload);
          break;
        }
        case CheckState: {
          const { msg, state } = JSON.parse(payload);
          console.log(state);
          break;
        }
        case SetExploredNodes: {
          const { arr } = JSON.parse(payload);

          if (animation.current) {
            dispatch(SetAllAsExplored(arr));
            setTimeout(() => {
              dispatch(FixAllAsExplored(arr));
              // console.log("Fixed");
            }, AnimationSpeed.current + 100);
          } else {
            dispatch(FixAllAsExplored(arr));
          }
          lastarr.current = arr;
          break;
        }
        case FixExploredNodes: {
          const { arr } = JSON.parse(payload);
          dispatch(FixAllAsExplored(arr));
          break;
        }
        case SetFinalPath: {
          // console.log("SetFinalPath called");
          const { arr } = JSON.parse(payload);
          if (animation.current) {
            dispatch(SetALLAsPath(arr));
            setTimeout(() => {
              dispatch(FixAllAsPath(arr));
              // console.log("Fixed");
            }, AnimationSpeed.current + 100);
          } else {
            dispatch(FixAllAsPath(arr));
          }
          lastarr.current = arr;
          break;
        }
        case FixFinalPath: {
          const { arr } = JSON.parse(payload);
          dispatch(FixAllAsPath(arr));
          break;
        }
        case FixGrid: {
          console.log("FixingGrid");
          const graph = JSON.parse(payload);
          dispatch(SetGrid(graph));
          break;
        }
        case Stop: {
          // console.log("lastarr", lastarr);
          // if (lastarr.current != null) {
          //   dispatch(FixAllAsExplored(lastarr.current));
          //   // dispatch(PlayPauseAction());
          // }
          break;
        }
        case Finished: {
          console.log("Finished");
          if (lastarr.current != null) {
            // dispatch(FixAllAsExplored(lastarr.current));
            dispatch(PlayPauseAction());
          }
          break;
        }
        default:
          break;
      }
    });
    console.log("Hello Worker");
    workerInstance.postMessage({
      type: ConsoleLog,
      payload: "Hello from Worker",
    });
    workerInstance.postMessage({
      type: CurrentState,
      payload: JSON.stringify(state),
    });
  }, []);
  useEffect(() => {
    if (PlaypauseState) {
      // dispatch(CleanGrid());
      setTimeout(() => {
        // workerInstance.postMessage({
        //   type: CurrentState,
        //   payload: JSON.stringify(state),
        // });
        workerInstance.postMessage({
          type: Start,
          payload: JSON.stringify(state),
        });
        // workerInstance.postMessage({
        //   type: InstantAlgo,
        //   payload: "",
        // });
      }, 200);
    } else {
      workerInstance.postMessage({
        type: Stop,
        payload: "",
      });
    }
  }, [PlaypauseState]);
  useEffect(() => {
    if (PlaypauseState && !Moving) {
      // dispatch(CleanGrid());
      // workerInstance.postMessage({
      //   type: CurrentState,
      //   payload: JSON.stringify(state),
      // });

      setTimeout(() => {
        workerInstance.postMessage({
          type: InstantAlgo,
          payload: JSON.stringify(state),
        });
      }, 200);
    }
  }, [start, target, Moving, ActivePortal]);
  useEffect(() => {
    console.log("worker Animation updated to :-", animation.current);
  }, [animation.current]);
  return <></>;
}

export default WorkerContainer;
