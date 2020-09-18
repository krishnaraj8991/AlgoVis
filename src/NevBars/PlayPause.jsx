import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Pause2, Play2 } from "../_Icons/PlayPause";

const Button = styled.div`
  height: 50px;
  width: 50px;
  position: relative;
  top: 1.5rem;
  /* margin: 1rem; */
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
`;
const PauseDiv = styled.div`
  position: absolute;
  height: 95%;
  width: 95%;
  transition: opacity 250ms ease-in;
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

  // },[])
  return (
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
  );
}

export default PlayPause;
