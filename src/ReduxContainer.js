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
import { Astar, BFS, DFS } from "./redux/themeState/themeType";
import Hex from "./components/Hive/Hex";
import {
  BlankNode,
  ExploredNode,
  PathNode,
  PortalNode1,
  StartNode,
  TargetNode,
  Wall,
} from "./redux/graph/graphStates";

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
const LegendText = styled.p`
  position: fixed;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  color: white;
`;
export const ReduxContainer = () => {
  const [lightTheme, setLighttheme] = useState(false);
  const dispatch = useDispatch();
  const algos = [
    {
      value: "A* Search",
      onClick: () => {
        dispatch(SetAlgo(Astar));
      },
    },
    {
      value: "Dijkstra's Algorithm",
      onClick: () => {
        dispatch(SetAlgo(BFS));
      },
    },
    {
      value: "Greedy Best-first Search",
      onClick: () => {
        dispatch(SetAlgo(Astar));
      },
    },
    {
      value: "Breadth-first Search",
      onClick: () => {
        dispatch(SetAlgo(BFS));
      },
    },
    {
      value: "Depth-first Search",
      onClick: () => {
        dispatch(SetAlgo(DFS));
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
          <Hex s={40} x={250} y={90} count={-1} val={BlankNode}></Hex>
          <Hex s={40} x={400} y={90} count={-2} val={ExploredNode}></Hex>
          <Hex s={40} x={550} y={90} count={-3} val={PathNode}></Hex>
          <Hex s={40} x={700} y={90} count={-4} val={Wall}></Hex>
          <Hex s={40} x={850} y={90} count={-5} val={StartNode}></Hex>
          <Hex s={40} x={1000} y={90} count={-6} val={TargetNode}></Hex>
          <Hex s={40} x={1150} y={90} count={-7} val={PortalNode1}></Hex>
          <LegendText left={200} top={95}>
            Unvisited Nodes
          </LegendText>
          <LegendText left={350} top={95}>
            Explored Nodes
          </LegendText>
          <LegendText left={500} top={95}>
            Final Path Nodes
          </LegendText>
          <LegendText left={685} top={95}>
            Wall
          </LegendText>
          <LegendText left={815} top={95}>
            Start Node
          </LegendText>
          <LegendText left={955} top={95}>
            Target Node
          </LegendText>
          <LegendText left={1125} top={95}>
            Portals
          </LegendText>
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
