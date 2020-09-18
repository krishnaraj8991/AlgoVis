import React, { useEffect, useState } from "react";
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
  padding: 10px;
`;
const Container = styled.div`
  position: relative;
  height: 50%;
  width: 100%;
  border-radius: 20px;
  /* background-color: ${(props) =>
    !props.theme.light ? css`silver` : css`rgba(255, 137, 26, 1)`}; */

  /* background-color: ${(props) =>
    props.on == "true"
      ? "lime"
      : props.theme.light
      ? "#f6e9e9"
      : props.theme.DarkTheme.color}; */

  background-color: #263859;
  display: flex;
  align-items: center;
  /* justify-content: ${(props) =>
    props.on == "true" ? css`flex-start` : css`flex-end`}; */
  transition: all 250ms ease-in;
  overflow: hidden;
`;
const Switch = styled.div`
  position: absolute;
  height: 100%;
  width: 50%;
  border-radius: 50%;
  background-color: #a9a9a9;
  box-shadow: 1px 1px 8px 2px #263859;
  /* transition: all 250ms ease-out; */
  transition: transform 300ms ease-in-out;
  transform: ${(props) =>
    !(props.on == "true") ? css`translateX(0%)` : css`translateX(100%)`};
`;
const OnPlane = styled.div`
  /* position: absolute; */
  height: 100%;
  width: 100%;
  border-radius: 20px;
  background-color: lime;
  transition: transform 300ms ease-in-out;
  transform: ${(props) =>
    !(props.on == "true") ? css`translateX(-50%)` : css`translateX(0%)`};
`;
function Switchs(props) {
  const [isOn, setIsOn] = useState(!!props.on);
  const switchref = useRef(null);
  // useEffect(() => {
  //   let switchstyle = switchref.current.style;
  // }, [props.on]);
  return (
    <Sheet>
      <Container
        onClick={() => {
          setIsOn((prev) => {
            return !prev;
          });
          props.onclick(!isOn);
        }}
        on={isOn.toString()}
      >
        <OnPlane on={isOn.toString()} />
        <Switch ref={switchref} on={isOn.toString()}>
          {/* {props.on == "true" ? <Sun /> : <Moon />} */}
        </Switch>
      </Container>
    </Sheet>
  );
}

export default Switchs;
