import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Plane from "./components/Plane";
import NevBar2 from "./NevBars/NevBar2";
import NevItem from "./NevBars/NevItem";
import { ReactComponent as CaretDown } from "./_Icons/caret-down.svg";

import DropdownMenu from "./NevBars/DropdownMenu";
import Hive from "./components/Hive/Hive";
import styled, { ThemeProvider, css } from "styled-components";
import Toggel from "./components/Toggel";
// import NevBar from "./NevBar";
const Container = styled.div`
  position: relative;
  /* margin: auto 0; */
  margin-top: auto;
  top: auto;
  left: auto;
  height: 80%;
  width: 100%;
  /* padding: 2rem; */
  background-color: teal;
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
  const theme = {
    light: lightTheme,
    LightTheme: {
      // color: css`rgba(0, 0, 0, 0.5)`,
      color: "#ff6c00",
    },
    DarkTheme: {
      color: "#263859",
    },
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <BackGround>
          <NevBar2>
            <Toggel
              on={lightTheme.toString()}
              clicked={() => {
                setLighttheme((prev) => !prev);
              }}
            />

            {/* <NevItem icon="😀">
              <DropdownMenu />
            </NevItem>
            <NevItem icon="😄" />
            <NevItem icon="😄" /> */}
            <NevItem icon={<CaretDown />}>
              <DropdownMenu />
            </NevItem>
          </NevBar2>
          <Space />
          <Container>
            <Hive />
          </Container>
        </BackGround>
      </ThemeProvider>
      {/* <NevBar /> */}
      {/* <Plane /> */}
    </>
  );
};

export default App;
