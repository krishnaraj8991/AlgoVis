import React, { createElement, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SetAsWall } from "../../redux/graph/graphActions";
import store from "../../redux/store";
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
    if (props.val == 0) {
      return "Black";
    }

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
  & p {
    transform: rotate(-45deg);
  }
`;
const Innerdiv = styled.div`
  text-align: center;
  position: absolute;
  /* background-color: ${(props) =>
    props.val == 0 ? css`rgba(0, 0, 0, 0)` : css`rgba(255, 255, 255, 0.4)`}; */

  background-color: rgba(255, 255, 255, 0.4);
  height: 100%;
  width: 100%;
  left: 50%;
  top: 50%;
  /* margin: 0; */
  clip-path: polygon(11% 12%, 60% 0%, 100% 40%, 88% 88%, 40% 100%, 0 60%);
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    transform: rotate(-45deg);
  }
  /* :hover   {
    background-color: rgba(255, 255, 255, 0.7);
  } */
`;

const Hex = ({ s, x, y, count, val }) => {
  const OuterRef = useRef();

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
        <Innerdiv ref={OuterRef} unselectable="on" val={val}></Innerdiv>
      </OuterDiv>
    </Container>
  );
};
const useEqual = (prevProps, nextProps) => {
  // console.log(prevProps, nextProps);
  // const state = store.getState()
  // const graph = state.graph.graph

  // const { i, j } = prevProps
  // const { next_i, next_j } = nextProps
  // // console.log(i,j,next_i,next_j)

  // if (typeof next_i!=="undefined" && typeof  next_j!=="undefined") {
  //   return graph[i][j]==graph[next_i][next_j]
  // }
  // return false
  // console.log(prevProps?.val, nextProps?.val);
  const preval = prevProps?.val;
  const nextval = nextProps?.val;
  if (nextval == undefined) {
    console.log(preval, nextval);
    nextval = -1;
  }
  return preval === nextval;
};
// export default Hex;
export default React.memo(Hex, useEqual);
// export default useClick;
