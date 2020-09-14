import React, { createElement, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Start } from "../../_Icons/start.svg";
import { ReactComponent as Target } from "../../_Icons/target.svg";

import {
  StartNode,
  TargetNode,
  Wall,
  WallTransition,
} from "../../redux/graph/graphStates";
// const OuterDiv = styled.div`
//   position: absolute;
//   background-color: rgba(255, 137, 26, 1);
//   height: ${(props) => props.s}px;
//   width: ${(props) => props.s}px;
//   left: ${(props) => props.x}px;
//   top: ${(props) => props.y}px;
//   clip-path: polygon(12% 12%, 60% 0%, 100% 40%, 88% 88%, 40% 100%, 0 60%);
//   transform: translate(-50%, -50%) rotate(45deg);
// `;
const Container = styled.div`
  position: absolute;
  /* background-color: #6b778d; */
  background-color: ${(props) => {
    return props.theme.light
      ? props.theme.LightTheme.color
      : props.theme.DarkTheme.color;
  }};
  /* transition: background-color 250ms ease-out; */
  /* background-color: silver; */

  height: ${(props) => props.s}px;
  width: ${(props) => props.s}px;
  left: 25%;
  top: 25%;
  clip-path: polygon(12% 12%, 60% 0%, 100% 40%, 88% 88%, 40% 100%, 0 60%);
  transform: translate(-50%, -50%) rotate(45deg);
  user-select: none;
  /* transition: all 1s ease-in, height 1s ease-out, width 1s ease-out; */
  padding: 0;
`;

const OuterDiv = styled.div`
  text-align: center;
  position: absolute;

  background-color: ${(props) => {
    return props.theme.light
      ? props.theme.LightTheme.color
      : props.theme.DarkTheme.color;
  }};
  /* background-color: rgba(255, 255, 255, 1); */
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

const SetWAll = (props) => keyframes`
  0%{
    height:0%;
    width:0%;
    border-radius:50%;
    /* background-color:lime; */
    /* background-color:black; */

    background-color:${
      props.theme.light
        ? props.theme.LightTheme.transitionColor
        : props.theme.DarkTheme.transitionColor
    };
  }
  80%{

    /* background-color:lime; */
    background-color:${
      props.theme.light
        ? props.theme.LightTheme.transitionColor
        : props.theme.DarkTheme.transitionColor
    };

  }
  80%{
    border-radius:50%;
  }
  100%{
    height:100%;
    width:100%;
    border-radius:0%;

    /* background-color:black; */
  }
`;

const AnimationDiv = styled.div`
  text-align: center;
  position: absolute;
  ${(props) => {
    if (props.val == WallTransition) {
      return css`
        /* transition: background-color 250ms ease-out; */
        animation: ${(props) => SetWAll(props)} 250ms ease-in-out forwards;
      `;
    }
  }}
  background-color: ${(props) => {
    if (props.val == Wall || props.val == WallTransition) {
      return "Black";
    }

    return props.theme.light
      ? props.theme.LightTheme.color
      : props.theme.DarkTheme.color;
  }};
  /* background-color: rgba(255, 255, 255, 1); */
  height: 100%;
  width: 100%;
  left: 50%;
  top: 50%;
  /* border-radius: 50%; */
  /* margin: 0; */
  /* clip-path: polygon(11% 12%, 60% 0%, 100% 40%, 88% 88%, 40% 100%, 0 60%); */
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    transform: rotate(-45deg);
  }
`;

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

  & svg {
    ${(props) => {
      return props.istarget == "true"
        ? css`
            height: 50%;
            width: 50%;
          `
        : css`
            height: 40%;
            width: 40%;
          `;
    }};
    transform: rotate(-45deg);
  }
`;

const Hex = ({ s, x, y, count, val, width }) => {
  const OuterRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    let ele = document.getElementById(count);
    ele.style.top = `${y}px`;
    ele.style.left = `${x}px`;
  }, [y, x]);
  const logMousedown = (e) => {
    if (e.buttons == 1) {
    }
  };
  useEffect(() => {
    OuterRef.current.addEventListener("mouseover", logMousedown);
  }, []);

  return (
    <Container
      s={s}
      x={x}
      y={y}
      unselectable="on"
      id={count}
      light
      val={val}
      onMouseOver={(e) => {}}
    >
      <OuterDiv unselectable="on" light val={val}>
        <AnimationDiv light val={val}></AnimationDiv>
        <Innerdiv
          ref={OuterRef}
          unselectable="on"
          val={val}
          istarget={(val == TargetNode).toString()}
        >
          <div
            className="Trigger"
            style={{
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
