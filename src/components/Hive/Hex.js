import React, { createElement, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Start } from "../../_Icons/start.svg";
import { ReactComponent as Target } from "../../_Icons/target.svg";

import {
  BlankNode,
  StartNode,
  TargetNode,
  Wall,
  WallTransition,
} from "../../redux/graph/graphStates";
import { FixAsWall } from "../../redux/graph/graphActions";

const Container = styled.div`
  position: absolute;
  background-color: #ff6c00;
  height: 0px;
  width: 0px;
  left: 0px;
  top: 0px;
  clip-path: polygon(12% 12%, 60% 0%, 100% 40%, 88% 88%, 40% 100%, 0 60%);
  transform: translate(-50%, -50%) rotate(45deg);
  user-select: none;
  transition: all 250ms ease-in;
  padding: 0;
  &.dark {
    background-color: #263859;
  }
`;
const OuterDiv = styled.div`
  text-align: center;
  position: absolute;

  height: 90%;
  width: 90%;
  left: 50%;
  top: 50%;
  /* margin: 0; */
  clip-path: polygon(11% 12%, 60% 0%, 100% 40%, 88% 88%, 40% 100%, 0 60%);
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  /* filter: brightness(1); */
  & p {
    transform: rotate(-45deg);
  }
`;

const AnimationDiv = styled.div`
  /* position: absolute; */
  text-align: center;
  background-color: black;
  height: 100%;
  width: 100%;
  /* left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0);
  clip-path: polygon(12% 12%, 60% 0%, 100% 40%, 88% 88%, 40% 100%, 0 60%);
  & p {
    transform: rotate(-45deg);
  }
  &.Wall {
    /* opacity: 1; */
    /* transition: transform 250ms ease-out; */
    transform: scale(1.2);
    opacity: 1;
  }
  &.WallTransition {
    /* opacity: 1; */
    transition: transform 200ms ease-out;
    transform: scale(1.2);
    opacity: 1;
  }
`;

const target = keyframes`
0%{height: 10%;
    width: 10%;}

100%{
  height: 50%;
    width: 50%;
}`;
const start = keyframes`
0%{height: 10%;
    width: 10%;}

100%{
  height: 40%;
    width: 40%;
}`;
const Innerdiv = styled.div`
  text-align: center;
  position: absolute;

  background-color: rgba(255, 255, 255, 0.4);

  height: 100%;
  width: 100%;
  left: 50%;
  top: 50%;
  /* margin: 0; */
  /* clip-path: polygon(11% 12%, 60% 0%, 100% 40%, 88% 88%, 40% 100%, 0 60%); */
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;

  &.target svg {
    height: 50%;
    width: 50%;
    /* animation: ${target} 350ms ease-out forwards; */
    transform: rotate(-45deg);
  }
  &.start svg {
    height: 40%;
    width: 40%;
    /* animation: ${start} 350ms ease-out forwards; */
    transform: rotate(-45deg);
  }
`;
const Hex = ({ s, x, y, count, val, width }) => {
  const AnimationRef = useRef();
  const light = useSelector((state) => state.theme.light);
  const dispatch = useDispatch();
  useEffect(() => {
    let ele = document.getElementById(count).style;
    ele.height = `${s}px`;
    ele.width = `${s}px`;
    ele.top = `${y}px`;
    ele.left = `${x}px`;
  }, []);
  return (
    <Container
      // s={s}
      unselectable="on"
      // x={x}

      // y={y}
      id={count}
      className={light ? "light " : "dark "}
    >
      <OuterDiv unselectable="on">
        <AnimationDiv
          className={
            val == BlankNode
              ? ""
              : val == WallTransition
              ? "WallTransition"
              : val == Wall
              ? "Wall"
              : ""
          }
          ref={AnimationRef}
          light
          val={val}
        ></AnimationDiv>
        <Innerdiv
          unselectable="on"
          val={val}
          className={
            val != BlankNode && val != Wall
              ? val == TargetNode
                ? "target"
                : "start"
              : ""
          }
        >
          <div
            className="Trigger"
            style={{
              // backgroundColor: "black",
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {val == StartNode ? <Start></Start> : ""}
            {val == TargetNode ? <Target></Target> : ""}
          </div>
        </Innerdiv>
      </OuterDiv>
    </Container>
  );
};
const useEqual = (prevProps, nextProps) => {
  const preval = prevProps?.val;
  const nextval = nextProps?.val;
  const prevWidth = prevProps?.width;
  const nextWidth = nextProps?.width;
  if (nextval == undefined) {
    console.log(preval, nextval);
    nextval = -1;
  }
  return preval === nextval && prevWidth === nextWidth;
};
// export default Hex;
export default React.memo(Hex, useEqual);
// export default useClick;
