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
  MoveingPortal1,
  MoveingPortal2,
  MovePortal1To,
  MovePortal2To,
} from "../../redux/graph/graphActions";
import {
  BlankNode,
  ExploredNode,
  ExploredNodeTransition,
  NoNode,
  PathNode,
  PathNodeTransition,
  PortalNode1,
  PortalNode2,
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
  let { movingPortal1, movingPortal2 } = useSelector(
    (state) => ({
      movingPortal1: state.graph.movingPortal1,
      movingPortal2: state.graph.movingPortal2,
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
    } else if (movingPortal1) {
      dispatch(MovePortal1To({ i, j }));
    } else if (movingPortal2) {
      dispatch(MovePortal2To({ i, j }));
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
      } else if (val == TargetNode) {
        console.log("moving target");
        dispatch(MoveingTarget(true));
      } else if (val == PortalNode1) {
        console.log("moving portal1");
        dispatch(MoveingPortal1(true));
      } else if (val == PortalNode2) {
        console.log("moving portal2");
        dispatch(MoveingPortal2(true));
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
    if (movingPortal1) {
      console.log("stoped moving");
      dispatch(MoveingPortal1(false));
    }
    if (movingPortal2) {
      console.log("stoped moving");
      dispatch(MoveingPortal2(false));
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
