import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

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
  background-color: #6b778d;
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

//   const HoverText = styled.p`
//     color: #000;
//     :hover {
//       color: #ed1212;
//       cursor: pointer;
//     }
//   `;

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
  background-color: rgba(255, 255, 255, 0.4);
  /* background-color: rgba(255, 255, 255, 1); */
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
`;

const Hex = ({ s, x, y, val = "", count }) => {
  //  rotate(45deg) ",
  // style["left"] = x;
  // style["top"] = y;
  //   console.log(x, y);
  const OuterRef = useRef();
  useEffect(() => {
    let ele = document.getElementById(count);
    ele.style.top = `${y}px`;
    ele.style.left = `${x}px`;
  }, [y, x]);

  return (
    // <div style={style} >
    //   <div style={innerStyle}></div>
    // </div>
    <Container
      ref={OuterRef}
      s={s}
      x={x}
      y={y}
      unselectable="on"
      id={count}
      light
      val={val}
    >
      <OuterDiv unselectable="on" light val={val}>
        <Innerdiv unselectable="on">{/* <p>{val}</p> */}</Innerdiv>
      </OuterDiv>
    </Container>
  );
};
export default Hex;
