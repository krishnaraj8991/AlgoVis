import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Pause2, Play2 } from "../_Icons/PlayPause";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 50%;
  :hover {
    background-color: white;
  }
`;
const PlayDiv = styled.div`
  position: absolute;
  height: 95%;
  width: 95%;
  & svg {
    height: 100%;
    width: 100%;
  }
  /* &.on svg {
    opacity: 1;
    height: 100%;
    width: 100%;
  }
  &.off svg {
    opacity: 0;
    height: 100%;
    width: 100%;
  } */
`;
const PauseDiv = styled.div`
  position: absolute;
  height: 95%;
  width: 95%;
  transition: opacity 250ms ease-in;
  & svg {
    height: 100%;
    width: 100%;
  }
  &.on {
    opacity: 0;
  }
  &.off {
    opacity: 1;
  }
`;

function PlayPause({ value }) {
  const [isOn, SetIsOn] = useState(false);
  // useEffect(() => {
  //   console.log(isOn);
  // }, [isOn]);
  return (
    <Container>
      <Button
        onClick={() => {
          SetIsOn((prev) => !prev);
        }}
      >
        <PlayDiv>
          <Play2 />
        </PlayDiv>
        <PauseDiv className={!isOn ? "on" : "off"}>
          <Pause2 />
        </PauseDiv>
      </Button>
    </Container>
  );
}

export default PlayPause;
