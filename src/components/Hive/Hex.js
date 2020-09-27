import React, { createElement, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { ReactComponent as Start } from "../../_Icons/start.svg";
import { ReactComponent as Target } from "../../_Icons/target.svg";

import {
  BlankNode,
  ExploredNode,
  ExploredNodeTransition,
  NoNode,
  PathNode,
  PathNodeTransition,
  StartNode,
  TargetNode,
  Wall,
  WallTransition,
} from "../../redux/graph/graphStates";

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
  /* transition: all 250ms ease-in; */
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
  background-color: rgba(255, 255, 255, 0.4);
  clip-path: polygon(11% 12%, 60% 0%, 100% 40%, 88% 88%, 40% 100%, 0 60%);
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  /* filter: brightness(1); */
  & p {
    transform: rotate(-45deg);
  }
  &.NoNode {
    opacity: 0;
  }
`;

const ExplorDark = keyframes`
0%{
  opacity: 1;
  background-color: #a7d129;
  border-radius:50%;
  transform: scale(0);
}

58%{
  background-color: #a7d129 ;
  border-radius:50%;
}
60%{
  transform: scale(1);
  background-color: #ede68a;

}
80%{
  background-color: #ede68a;
}
100%{
  opacity: 1;
  transform: scale(1);
  border-radius:0%;
  background-color: #219897;
}

`;

const ExplorLight = keyframes`
0%{
  opacity: 1;
  background-color: #6a2c70;
  border-radius:50%;
  transform: scale(0);
}

50%{
  background-color: #6a2c70 ;
  border-radius:50%;
}
55%{
  transform: scale(1);
  /* background-color: #f9ed69; */
  background-color: #62d2a2;

}
80%{

  /* background-color: #f9ed69; */
  background-color: #62d2a2;

}
100%{
  opacity: 1;
  transform: scale(1);
  border-radius:0%;
  background-color: #b83b5e;
}

`;

const WallAnimation = keyframes`
0%{
  opacity: 1;
  background-color:  #3d3d3d;
  transform: scale(0);
  /* border-radius:50%; */
}
60%{
  transform: scale(1);
  background-color:  #3d3d3d;
  /* border-radius:50%; */
}

100%{
  opacity: 1;
  transform: scale(1);
  background-color: #010101;
  /* border-radius:0%; */
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
  & p {
    transform: rotate(-45deg);
  }
  &.Wall {
    clip-path: polygon(12% 12%, 60% 0%, 100% 40%, 88% 88%, 40% 100%, 0 60%);
    transform: scale(1.2);
    border-radius: 0%;
    opacity: 1;
    background-color: black;
  }
  &.WallTransition {
    clip-path: polygon(12% 12%, 60% 0%, 100% 40%, 88% 88%, 40% 100%, 0 60%);
    animation: ${WallAnimation} ${(props) => props.Speed}ms ease-in-out forwards;
    opacity: 1;
    background-color: black;
  }
  &.ExploredNode {
    /* background-color: #278ea5; */
    &.dark {
      background-color: #219897;
    }
    &.light {
      background-color: #b83b5e;
    }
    transform: scale(1);
    opacity: 1;
  }
  &.ExploredNodeTransition {
    /* opacity: 1; */
    &.dark {
      animation: ${ExplorDark} ${(props) => props.Speed + 400}ms ease-in-out
        forwards;
    }
    &.light {
      animation: ${ExplorLight} ${(props) => props.Speed + 400}ms ease-in-out
        forwards;
    }

    /* background-color: #1e5f74; */
    /* transform: scale(1); */
  }
  &.PathNode {
    /* background-color: #278ea5; */
    &.dark {
      background-color: #f9d276;
    }
    &.light {
      background-color: #3282b8;
    }
    transform: scale(1);
    opacity: 1;
  }
  &.PathNodeTransition {
    /* opacity: 1; */
    transform: scale(0);

    transition: all ${(props) => props.Speed + 400}ms ease-in-out;
    &.dark {
      background-color: #f9d276;
    }
    &.light {
      background-color: #3282b8;
    }

    transform: scale(1);
    opacity: 1;
  }
`;
//  animation: ${PathLight} ${(props) => props.Speed + 400}ms ease-in-out
// forwards;
// /animation: ${PathDark} ${(props) => props.Speed + 400}ms ease-in-out
//   forwards;
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

  /* background-color: rgba(255, 255, 255, 0.4); */
  background-color: white;
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
  opacity: 0;
  &.Wall {
    opacity: 0.4;
  }
  &.StartNode,
  &.TargetNode {
    opacity: 1;
    background-color: transparent;
  }
  &.TargetNode svg {
    height: 50%;
    width: 50%;
    transform: rotate(-45deg);
  }
  &.StartNode svg {
    height: 40%;
    width: 40%;
    transform: rotate(-45deg);
  }
`;
const Hex = ({ s, x, y, count, val, Ref }) => {
  // const AnimationRef = useRef();

  const light = useSelector((state) => state.theme.light, shallowEqual);
  const Speed = useSelector(
    (state) => state.theme.animationSpeed,
    shallowEqual
  );
  let ValClassName = "";
  let ThemeClassName = light ? "light " : "dark ";

  const AnimationRef = useRef(null);
  const InnerDivRef = useRef(null);
  useEffect(() => {
    let ele = document.getElementById(count).style;
    ele.height = `${s}px`;
    ele.width = `${s}px`;
    ele.top = `${y}px`;
    ele.left = `${x}px`;

    // Ref.current = {
    //   AnimationRef: AnimationRef.current,
    //   InnerDivRef: InnerDivRef.current,
    // };
  }, []);

  // Determine ClassName for the node
  switch (val) {
    case BlankNode:
      ValClassName = "";
      break;
    case WallTransition:
      ValClassName = "WallTransition";
      break;
    case Wall:
      ValClassName = "Wall";
      break;
    case ExploredNodeTransition:
      ValClassName = "ExploredNodeTransition";
      break;
    case ExploredNode:
      ValClassName = "ExploredNode";
      break;
    case TargetNode:
      ValClassName = "TargetNode";
      break;
    case StartNode:
      ValClassName = "StartNode";
      break;
    case NoNode:
      ValClassName = "NoNode";
      break;
    case PathNode:
      ValClassName = "PathNode";
      break;
    case PathNodeTransition:
      ValClassName = "PathNodeTransition";
      break;
    default:
      ValClassName = "";
  }

  return (
    <Container unselectable="on" id={count} className={ThemeClassName}>
      <OuterDiv unselectable="on">
        <AnimationDiv
          className={`${ValClassName} ${ThemeClassName}`}
          light
          Speed={Speed}
        ></AnimationDiv>
        <Innerdiv
          unselectable="on"
          className={`${ValClassName} ${ThemeClassName}`}
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
            {/* <p style={{ fontSize: "10px" }}>{ValClassName}</p> */}
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
// export default React.memo(Hex);
// export default useClick;
