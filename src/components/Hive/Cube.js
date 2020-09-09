import React, { useEffect } from "react";
import styled from "styled-components";
const OuterDiv = styled.div`
  position: absolute;
  background-color: rgba(255, 137, 26, 1);
  height: ${(props) => props.s}px;
  width: ${(props) => props.s}px;
  left: 25%;
  top: 25%;
  //   clip-path: polygon(12% 12%, 60% 0%, 100% 40%, 88% 88%, 40% 100%, 0 60%);
  clip-path: polygon(10% 13%, 65% 0%, 100% 35%, 90% 87%, 35% 100%, 0% 65%);
  transform: translate(-50%, -50%) rotate(45deg);
  user-select: none;
  transition: all 1s, height 0.5s, width 0.5s;
  :hover {
    height: ${(props) => props.s - 10}px;
    width: ${(props) => props.s - 10}px;
    z-index: -1000;
  }
`;

const Top = styled.div`
  text-align: center;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  height: 90%;
  width: 90%;
  left: 50%;
  top: 50%;
  clip-path: polygon(10% 13%, 65% 0%, 51% 49%, 0% 65%);
  transform: translate(-50%, -50%);
  user-select: none;
  :hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
const Right = styled.div`
  text-align: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  height: 90%;
  width: 90%;
  left: 50%;
  top: 50%;
  clip-path: polygon(65% 0%, 100% 35%, 90% 87%, 51% 49%);
  transform: translate(-50%, -50%);
  :hover {
    background-color: rgba(255, 255, 255, 0);
  }
`;
const Left = styled.div`
  text-align: center;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
  height: 90%;
  width: 90%;
  left: 50%;
  top: 50%;
  clip-path: polygon(51% 49%, 90% 87%, 35% 100%, 0% 65%);
  transform: translate(-50%, -50%);
  :hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

// const Top = styled.div`
//   text-align: center;
//   position: absolute;
//   background-color: rgba(255, 255, 255, 0.46);
//   height: 90%;
//   width: 90%;
//   left: 50%;
//   top: 50%;
//   clip-path: polygon(10% 10%, 55% 0%, 45% 45%, 0% 55%);

//   //   clip-path: polygon(10% 10%, 55% 1%, 46% 46%, 1% 56%);
//   transform: translate(-50%, -50%);
//   user-select: none;
//   :hover {
//     background-color: rgba(255, 255, 255, 0.8);
//   }
// `;
// const Right = styled.div`
//   text-align: center;
//   position: absolute;
//   background-color: rgba(255, 255, 255, 0.46);
//   height: 90%;
//   width: 90%;
//   left: 50%;
//   top: 50%;
//   clip-path: polygon(52% 46%, 62% 3%, 100% 40%, 90% 84%);
//   //   clip-path: polygon(50% 46%, 88% 85%, 100% 40%, 60% 4%);
//   transform: translate(-50%, -50%);
//   :hover {
//     background-color: rgba(255, 255, 255, 0.8);
//   }
// `;
// const Left = styled.div`
//   text-align: center;
//   position: absolute;
//   background-color: rgba(255, 255, 255, 0.46);
//   height: 90%;
//   width: 90%;
//   left: 50%;
//   top: 50%;
//   clip-path: polygon(46% 52%, 85% 90%, 40% 100%, 3% 62%);
//   transform: translate(-50%, -50%);
//   :hover {
//     background-color: rgba(255, 255, 255, 0.8);
//   }
// `;
export default function Cube({
  s = 290,
  y = 200,
  x = 200,
  count = 1,
  val = "",
  z = 0,
}) {
  useEffect(() => {
    let ele = document.getElementById(count);
    ele.style.top = `${y}px`;
    ele.style.left = `${x}px`;
    ele.style.zIndex = z;
  }, []);
  return (
    <OuterDiv s={s} x={x} y={y} id={count}>
      <br />
      {val}
      <Top />
      <Right />
      <Left />
    </OuterDiv>
  );
}
