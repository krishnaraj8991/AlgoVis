import React, { useEffect, useRef, useState } from "react";
import { Provider, useDispatch, connect, useSelector } from "react-redux";

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
  ClearGrid,
  FixAllAsExplored,
  FixAsExplored,
  SetAllAsExplored,
  SetAsExplored,
} from "./redux/graph/graphActions";
import workerCom from "./WebWorkers/workerCom";
import WebWorker from "./WebWorkers/workerSetup";
import {
  CurrentState,
  ConsoleLog,
  CheckState,
  SetExploredNodes,
  Start,
  Stop,
} from "./WebWorkers/MessageTypes";

const Container = styled.div`
  position: relative;
  /* margin: auto 0; */
  margin-top: auto;
  top: auto;
  left: auto;
  height: 80%;
  width: 100%;
  /* padding: 2rem; */
  /* background-color: ${(props) => props.theme.DarkTheme}; */
  /* padding: 2rem; */
  /* transform: translate(-50%, -50%); */
  overflow: hidden;
`;
const BackGround = styled.div`
  display: flex;

  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${(props) => (props.theme.light ? "#f6e9e9" : "#363333")};
  transition: background-color 250ms ease-out;
`;
const Space = styled.div`
  margin-bottom: auto;
`;

const workerInstance = new WebWorker(workerCom);
export const ReduxContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const PlaypauseState = useSelector((state) => state.theme.playpause);
  const [lightTheme, setLighttheme] = useState(false);
  const lastarr = useRef(null);
  const algos = [
    {
      value: "A* Search",
      onClick: () => {},
    },
    { value: "Dijkstra's Algorithm", onClick: () => {} },
    { value: "Greedy Best-first Search", onClick: () => {} },
    { value: "Breadth-first Search", onClick: () => {} },
    { value: "Depth-first Search", onClick: () => {} },
  ];

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
          const { arr, prevarr } = JSON.parse(payload);
          dispatch(SetAllAsExplored(arr));
          dispatch(FixAllAsExplored(prevarr));
          lastarr.current = arr;
          break;
        }
        case Stop: {
          console.log("lastarr", lastarr);
          if (lastarr.current != null) {
            dispatch(FixAllAsExplored(lastarr.current));
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
      workerInstance.postMessage({
        type: Start,
        payload: "",
      });
    } else {
      workerInstance.postMessage({
        type: Stop,
        payload: "",
      });
    }
  }, [PlaypauseState]);
  return (
    <>
      <BackGround>
        <NevBar>
          <NevItem value={"Algorithms"}>
            <DropdownMenu items={algos}></DropdownMenu>
          </NevItem>
          <NevItem value={"Portals"} />
          <NevItem
            value={"ClearGrid"}
            onClick={(dispatch) => {
              dispatch(ClearGrid());
            }}
          />
          <div id="cl5">
            <NevItem value={"GridSize"}>
              <GridSize />
            </NevItem>
          </div>
          <div id="cl2">
            <PlayPause />
          </div>

          <TheamSwitcher
            on={lightTheme.toString()}
            clicked={() => {
              setLighttheme((prev) => !prev);
            }}
          />
          <SideMenu></SideMenu>
        </NevBar>

        <Space />

        <Container>
          <Hive lightTheme />
        </Container>
      </BackGround>

      {/* <NevBar /> */}
      {/* <Plane /> */}
    </>
  );
};

export default ReduxContainer;
