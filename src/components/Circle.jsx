import React from "react";
import styled, { keyframes, css } from "styled-components";
// import { useRef } from "react";
import { useState } from "react";
const Pulse = keyframes`
0%{
    height:0%;
    width:0%;
}
50%{
    border-radius:40%;
}
80%{
    border-radius:20%;
}
100%{
    height:100%;
    width:100%;
    border-radius:5%;
}
/* 100%{
    height:0%;
    width:0%;
} */
`;
const RPulse = keyframes`
 0%{
    height:100%;
    width:100%;
    border-radius:5%;
}
50%{
    border-radius:20%;
}
80%{
    border-radius:40%;
}
100%{
    height:0%;
    width:0%;
    border-radius:50%
}
/* 100%{
    height:0%;
    width:0%;
} */
`;
const Container = styled.div`
  display: flex;
  /* position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  height: ${(props) => (props.size ? props.size : "100px")};
  width: ${(props) => (props.size ? props.size : "100px")};
  background-color: teal;
  border-radius: 5%;
  align-items: center;
  justify-content: center;
`;
const Circled = styled.div`
  /* height: 0%;
  width: 0%; */
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  ${(props) => {
    if (props.active === true) {
      return css`
        animation: ${Pulse} 1s forwards;
      `;
    } else {
      return css`
        animation: ${RPulse} 1s forwards;
      `;
    }
  }}/* animation-fill-mode: forwards; */
`;
function Circle(props) {
  const [hovered, setHovered] = useState(false);
  const addHover = (e) => {
    setHovered((prev) => !prev);
    console.log("hovered");
    // console.log("hover", circleref.current.style.animation);
  };
  return (
    <Container onClick={addHover} size={props.size}>
      <Circled active={hovered} />
    </Container>
  );
}

export default Circle;
