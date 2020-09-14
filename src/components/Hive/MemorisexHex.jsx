import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FixAsWall,
  MoveingStart,
  RemoveWall,
  SetAsWall,
  MoveingTarget,
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
  let moving = useSelector((state) => state.movingTarget || state.movingStart);
  const dispatch = useDispatch();
  const EventHandler = () => {
    // if (val == BlankNode) {
    //   dispatch(SetAsWall({ i, j }));
    // } else if (val == Wall) {
    //   dispatch(RemoveWall({ i, j }));
    // }
    if (moving) {
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

  useEffect(() => {
    if (val == WallTransition) {
      const interval = setTimeout(() => {
        dispatch(FixAsWall({ i, j }));
      }, 250);
    }
  }, [val]);
  return (
    <div onClick={ClickHandler} onMouseOver={OverHandler}>
      <Hex {...remainingProps} val={val}></Hex>
    </div>
  );
}

export default MemorisexHex;
