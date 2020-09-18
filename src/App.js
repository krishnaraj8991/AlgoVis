import React, { useState } from "react";
import "./App.css";
import NevBar from "./NevBars/NevBar";
import NevItem from "./NevBars/NevItem";
import { ReactComponent as CaretDown } from "./_Icons/caret-down.svg";

import DropdownMenu from "./NevBars/DropdownMenu";
import Hive from "./components/Hive/Hive";
import styled, { ThemeProvider, css } from "styled-components";
import TheamSwitcher from "./components/TheamSwitcher";
import Switch from "./components/Switch";
// Store
import { Provider } from "react-redux";
import store from "./redux/store";
import PlayPause from "./NevBars/PlayPause";

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
const App = () => {
  const [lightTheme, setLighttheme] = useState(false);
  const dropdown = [
    { key: 1, switch: true, value: "Boundary" },
    { key: 2, switch: true, value: "Animation" },
    { key: 3, switch: true, value: "Something" },
  ];
  const algos = [
    {
      key: 1,
      value: "A* Search",
    },
    {
      key: 2,
      value: "Dijkstra's Algorithm",
    },
    {
      key: 3,
      value: "Greedy Best-first Search",
    },
    {
      key: 4,
      value: "Breadth-first Search",
    },
    {
      key: 5,
      value: "Depth-first Search",
    },
  ];
  const theme = {
    light: lightTheme,
    LightTheme: {
      // color: css`rgba(0, 0, 0, 0.5)`,
      color: "#ff6c00",
      transitionColor: "#263859",
      // transitionColor: "mediumvioletred",
    },
    DarkTheme: {
      color: "#263859",
      transitionColor: "#ff6c00",
      // transitionColor: "darkorange",
    },
  };
  return (
    <>
      {/* Data Provider */}
      <Provider store={store}>
        {/* Theam Provider */}
        <ThemeProvider theme={theme}>
          <BackGround>
            <NevBar>
              {/* <Switch
                on={"true"}
                onclick={() => {
                  console.log("clicked");
                }}
              /> */}
              <div id="cl1">
                <NevItem value={"Algorithms"}>
                  <DropdownMenu items={algos}></DropdownMenu>
                </NevItem>
              </div>
              <div id="cl2">
                <PlayPause value={"play"} />
              </div>

              <div id="cl3">
                <TheamSwitcher
                  on={lightTheme.toString()}
                  clicked={() => {
                    setLighttheme((prev) => !prev);
                  }}
                />
              </div>
              <div id="cl4">
                <NevItem icon={<CaretDown />}>
                  <DropdownMenu right items={dropdown}></DropdownMenu>
                </NevItem>
              </div>
            </NevBar>

            <Space />

            <Container>
              <Hive lightTheme />
            </Container>
          </BackGround>
        </ThemeProvider>
      </Provider>

      {/* <NevBar /> */}
      {/* <Plane /> */}
    </>
  );
};

export default App;
