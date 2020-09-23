import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FixAsWall,
  RemoveWall,
  SetAsWall,
  MoveingStart,
  MoveingTarget,
  MoveStartTo,
  MoveTargetTo,
} from "../../redux/graph/graphActions";
import {
  BlankNode,
  StartNode,
  TargetNode,
  Wall,
  WallTransition,
} from "../../redux/graph/graphStates";
import Hex from "./Hex";
function MemorisexHex(props) {
  const { i, j, LeftButtonDown, ...remainingProps } = props;
  //   console.log(i, j);

  const val = useSelector((state) => state.graph.graph[i][j]);
  let { movingStart, movingTarget } = useSelector((state) => ({
    movingStart: state.graph.movingStart,
    movingTarget: state.graph.movingTarget,
  }));

  const animation = useSelector((state) => state.theme.animation);
  const dispatch = useDispatch();
  const EventHandler = () => {
    if (movingStart) {
      dispatch(MoveStartTo({ i, j }));
      // console.log("movnig");
    } else if (movingTarget) {
      dispatch(MoveTargetTo({ i, j }));
    } else {
      if (val == BlankNode) {
        if (animation) {
          dispatch(SetAsWall({ i, j }));

          // Replacing SetTimeout with RequestAnimationFrame
          // setTimeout(() => {
          //   dispatch(FixAsWall({ i, j }));
          // }, 350);
          const endTime = new Date().getTime() + 250;
          const AnimationTimeout = () => {
            const currentTime = new Date().getTime();
            const remaining = endTime - currentTime;
            if (remaining < 1) {
              dispatch(FixAsWall({ i, j }));
              // console.log("fixed as wall");
            } else {
              requestAnimationFrame(AnimationTimeout);
            }
          };
          // kick it all off
          requestAnimationFrame(AnimationTimeout);
        } else {
          dispatch(FixAsWall({ i, j }));
        }
      } else if (val == WallTransition || val == Wall) {
        dispatch(RemoveWall({ i, j }));
      }
    }
  };
  const ClickHandler = () => {
    // console.log(i, ",", j, "clicked", val);
    EventHandler();
  };
  const OverHandler = (e) => {
    if (LeftButtonDown.current && e.target.className == "Trigger") {
      EventHandler();
    }
  };
  const MouseDownHandler = (e) => {
    if (
      !LeftButtonDown.current &&
      e.button == 0 &&
      (e.target.className == "Trigger" || e.target.tagName == "rect")
    ) {
      if (val == StartNode) {
        console.log("moving start");
        dispatch(MoveingStart(true));
      }
      if (val == TargetNode) {
        console.log("moving target");
        dispatch(MoveingTarget(true));
      }
      // LeftButtonDown.current = true;
    }
  };
  const MouseUpHandler = () => {
    if (movingStart) {
      console.log("stoped moving");
      dispatch(MoveingStart(false));
    }
    if (movingTarget) {
      console.log("stoped moving");
      dispatch(MoveingTarget(false));
    }
  };
  return (
    <div
      onClick={ClickHandler}
      onMouseOver={OverHandler}
      onMouseDown={MouseDownHandler}
      onMouseUp={MouseUpHandler}
    >
      <Hex {...remainingProps} val={val}></Hex>
    </div>
  );
}

export default MemorisexHex;
