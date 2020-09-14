import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as Moon } from "../_Icons/crescent-moon-svgrepo-com.svg";
import { ReactComponent as Sun } from "../_Icons/sun-svgrepo-com.svg";
import { useRef } from "react";

const Sheet = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  /* position: relatives; */
  height: 50%;
  width: 100%;
  border-radius: 20px;
  /* background-color: ${(props) =>
    !props.theme.light ? css`silver` : css`rgba(255, 137, 26, 1)`}; */

  background-color: ${(props) =>
    !props.theme.light
      ? props.theme.DarkTheme.color
      : props.theme.LightTheme.color};

  display: flex;
  align-items: center;
  /* justify-content: ${(props) =>
    props.on == "true" ? css`flex-start` : css`flex-end`}; */
  transition: all 250ms ease-in;
`;
const Switch = styled.div`
  position: relative;
  height: 100%;
  width: 50%;
  border-radius: 50%;
  background-color: gray;
  /* transition: all 250ms ease-out; */
  transition: transform 300ms ease-out;
  box-shadow: 1px 1px 8px 2px #263859;
  transform: ${(props) =>
    props.theme.light ? css`translateX(0%)` : css`translateX(100%)`};
`;
function TheamSwitcher(props) {
  const switchref = useRef(null);
  // useEffect(() => {
  //   let switchstyle = switchref.current.style;
  // }, [props.on]);
  return (
    <Sheet>
      <Container onClick={props.clicked}>
        <Switch ref={switchref} on={props.on}>
          {props.on == "true" ? <Sun /> : <Moon />}
        </Switch>
      </Container>
    </Sheet>
  );
}

export default TheamSwitcher;
