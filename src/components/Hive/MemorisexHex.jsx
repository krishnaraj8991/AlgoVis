import React, { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  FixAsWall,
  RemoveWall,
  SetAsWall,
  MoveingStart,
  MoveingTarget,
  MoveStartTo,
  MoveTargetTo,
  SetAsExplored,
  FixAsExplored,
} from "../../redux/graph/graphActions";
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
import Hex from "./Hex";
function MemorisexHex(props) {
  const { i, j, LeftButtonDown, ...remainingProps } = props;

  const DataSize1 = useSelector((state) => state.graph.size);
  const val = useSelector((state) => {
    if (i < DataSize1 && j < DataSize1) {
      return state.graph.graph[i][j];
    }
    return BlankNode;
  }, shallowEqual);
  let { movingStart, movingTarget } = useSelector(
    (state) => ({
      movingStart: state.graph.movingStart,
      movingTarget: state.graph.movingTarget,
    }),
    shallowEqual
  );

  const animation = useSelector((state) => state.theme.animation);
  const Speed = useSelector(
    (state) => state.theme.animationSpeed,
    shallowEqual
  );

  const dispatch = useDispatch();

  const HexRef = useRef(null);

  const EventHandler = () => {
    if (movingStart) {
      dispatch(MoveStartTo({ i, j }));
      // console.log("movnig");
    } else if (movingTarget) {
      dispatch(MoveTargetTo({ i, j }));
    } else {
      if (
        val == BlankNode ||
        val == ExploredNodeTransition ||
        val == ExploredNode ||
        val == PathNode ||
        val == PathNodeTransition
      ) {
        if (animation) {
          dispatch(SetAsWall({ i, j }));
        } else {
          dispatch(FixAsWall({ i, j }));
          // dispatch(FixAsExplored({ i, j }));
        }
      } else if (val == WallTransition || val == Wall) {
        dispatch(RemoveWall({ i, j }));
      }
      // else if (val == ExploredNodeTransition || val == ExploredNode) {
      //   dispatch(RemoveWall({ i, j }));
      // }
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
    // HexRef.current.ToggleclassName = "Wall";
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
      } else {
        EventHandler();
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
      const endTime = new Date().getTime() + Speed;
      const AnimationTimeout = () => {
        const currentTime = new Date().getTime();
        if (currentTime > endTime) {
          dispatch(FixAsWall({ i, j }));
        } else {
          requestAnimationFrame(AnimationTimeout);
        }
      };
      // kick it all off
      requestAnimationFrame(AnimationTimeout);
    }
  }, [val]);

  return (
    <div
      // onClick={ClickHandler}
      onMouseOver={OverHandler}
      onMouseDown={MouseDownHandler}
      onMouseUp={MouseUpHandler}
    >
      {/* {console.log("rerendered")} */}
      <Hex {...remainingProps} val={val} Ref={HexRef}></Hex>
    </div>
  );
}

export default MemorisexHex;
