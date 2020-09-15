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
  const dispatch = useDispatch();
  const EventHandler = () => {
    // if (val == BlankNode) {
    //   dispatch(SetAsWall({ i, j }));
    // } else if (val == Wall) {
    //   dispatch(RemoveWall({ i, j }));
    // }

    if (movingStart) {
      dispatch(MoveStartTo({ i, j }));
      // console.log("movnig");
    } else if (movingTarget) {
      dispatch(MoveTargetTo({ i, j }));
    } else {
      switch (val) {
        case BlankNode:
          dispatch(SetAsWall({ i, j }));
          break;
        case Wall:
          dispatch(RemoveWall({ i, j }));
          break;
        default:
          break;
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
  useEffect(() => {
    if (val == WallTransition) {
      const interval = setTimeout(() => {
        dispatch(FixAsWall({ i, j }));
      }, 250);
    }
  }, [val]);
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
