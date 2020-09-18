import React from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as LoadingIcon } from "../_Icons/loadingIcon5.svg";
import { InnerRing, MiddlerRing, OuterRing } from "../_Icons/LoadingIconComp";
const Rotate = keyframes`
0%{
    transform:rotate(0deg);
    
}
/* 70%{
    transform:rotate(180deg);
   
} */
100%{
    transform:rotate(360deg);
   
}
`;
const Container = styled.div`
  position: fixed;
  height: 120vh;
  width: 120vw;
  top: 0px;
  left: 0px;
  /* background-color: rgb(0, 0, 0, 1); */
  background-color: transparent;
  /* margin: 100px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.div`
  height: 100px;
  width: 100px;
  position: relative;
`;
// /* animation: ${Rotate} 5s linear infinite; */
const H1 = styled.h1`
  position: relative;
  top: -10px;
  left: 10px;
  color: lightblue;
`;
const OuterRingS = styled(OuterRing)`
  position: absolute;
  top: 0px;
  left: 0px;

  animation: ${Rotate} 5s linear infinite reverse;
`;
const MiddlerRingS = styled(MiddlerRing)`
  position: absolute;
  top: 0px;
  left: 0px;

  animation: ${Rotate} 2s linear infinite;
`;
const InnerRingS = styled(InnerRing)`
  position: absolute;
  top: 0px;
  left: 0px;
`;

function Loading() {
  console.log("loading");
  return (
    <Container>
      <Icon>
        <OuterRingS />
        <MiddlerRingS />
        <InnerRingS />
      </Icon>
      <br />
      <H1>Initializing... </H1>
    </Container>
  );
}
export default Loading;
