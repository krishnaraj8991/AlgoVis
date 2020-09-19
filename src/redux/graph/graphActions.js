import {
  Fix_AS_WALL,
  Remove_Wall,
  Set_AS_WALL,
  Move_Start_To,
  Move_Target_To,
  Moving_Start,
  Moving_Target,
  Set_Boundarys,
  Set_Size,
} from "./graphTypes";

export const SetAsWall = ({ i, j }) => {
  return {
    type: Set_AS_WALL,
    payload: { i, j },
  };
};

export const FixAsWall = ({ i, j }) => {
  return {
    type: Fix_AS_WALL,
    payload: { i, j },
  };
};

export const RemoveWall = ({ i, j }) => {
  return {
    type: Remove_Wall,
    payload: { i, j },
  };
};
export const MoveTargetTo = ({ i, j }) => {
  return {
    type: Move_Target_To,
    payload: { i, j },
  };
};
export const MoveStartTo = ({ i, j }) => {
  return {
    type: Move_Start_To,
    payload: { i, j },
  };
};

export const MoveingTarget = (value) => {
  return {
    type: Moving_Target,
    payload: value,
  };
};
export const MoveingStart = (value) => {
  return {
    type: Moving_Start,
    payload: value,
  };
};

export const SetBoundarys = (value) => {
  return {
    type: Set_Boundarys,
  };
};
export const SetSize = (value) => {
  return {
    type: Set_Size,
    payload: value,
  };
};
