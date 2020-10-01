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
  ClearGrid,
  FixAllAsExplored,
  FixAsExplored,
  SetActivePortal,
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
import { SetAlgo } from "./redux/themeState/themeActions";
import { Astar, BFS, DFS, GreedyBFS } from "./redux/themeState/themeType";
import Hex from "./components/Hive/Hex";

import Legend from "./NevBars/Legend";
import AlgoTab from "./NevBars/AlgoTab";

const Container = styled.div`
  position: relative;
  /* margin: auto 0; */
  margin-top: auto;
  top: auto;
  left: auto;
  height: 80%;
  width: 100%;
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
  position: relative;
  margin-bottom: auto;
`;
export const ReduxContainer = () => {
  const [lightTheme, setLighttheme] = useState(false);
  const dispatch = useDispatch();
  const algos = [
    {
      value: "A* Algorithm",
      onClick: () => {
        dispatch(SetAlgo({ algo: Astar, algoName: "A* Algorithm" }));
      },
    },
    {
      value: "Dijkstra's Algorithm",
      onClick: () => {
        dispatch(SetAlgo({ algo: BFS, algoName: "Dijkstra's Algorithm" }));
      },
    },
    {
      value: "Greedy Best-first Search",
      onClick: () => {
        dispatch(
          SetAlgo({ algo: GreedyBFS, algoName: "Greedy Best-first Search" })
        );
      },
    },
    {
      value: "Breadth-first Search",
      onClick: () => {
        dispatch(SetAlgo({ algo: BFS, algoName: "Breadth-first Search" }));
      },
    },
    {
      value: "Depth-first Search",
      onClick: () => {
        dispatch(SetAlgo({ algo: DFS, algoName: "Depth-first Search" }));
      },
    },
  ];

  return (
    <>
      <BackGround>
        <NevBar>
          <NevItem value={"Algorithms"}>
            <DropdownMenu items={algos}></DropdownMenu>
          </NevItem>
          <NevItem
            value={"Portals"}
            onClick={(dispatch) => {
              dispatch(SetActivePortal());
            }}
          />
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
          <div id="cl6">
            <AlgoTab />
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

        <Space>
          <Legend />
        </Space>

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
