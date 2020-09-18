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
  background-color: #263859;
  display: flex;
  align-items: center;
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

  &.off {
    transform: translateX(0%);
  }
  &.on {
    transform: translateX(100%);
  }
`;
const OnPlane = styled.div`
  /* position: absolute; */
  height: 100%;
  width: 100%;
  border-radius: 20px;
  background-color: lime;
  transition: transform 300ms ease-in-out;
  &.off {
    transform: translateX(-50%);
  }
  &.on {
    transform: translateX(0%);
  }
`;
// transform: ${(props) =>
//   !(props.on == "true") ? css`translateX(-50%)` : css`translateX(0%)`};
const Switchs = ({ useOn, onFlip }) => {
  // const [isOn, setIsOn] = useState(true);
  // useEffect(() => {
  //   let switchstyle = switchref.current.style;
  // }, [props.on]);
  const [isON, setIsOn] = useOn();
  return (
    <Sheet>
      <Container
        onClick={() => {
          setIsOn();
          // onFlip();
        }}
      >
        <OnPlane className={isON ? "on" : "off"} />
        <Switch className={isON ? "on" : "off"}>
          {/* {props.on == "true" ? <Sun /> : <Moon />} */}
        </Switch>
      </Container>
    </Sheet>
  );
};

export default React.memo(Switchs);
