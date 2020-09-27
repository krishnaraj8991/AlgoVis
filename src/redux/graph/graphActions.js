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
  Clear_Grid,
  Set_AS_Explored,
  Fix_AS_Explored,
  Set_All_As_Explored,
  Fix_All_As_Explored,
  Set_As_Path,
  Fix_As_Path,
  Fix_All_As_Path,
  Set_All_As_Path,
  Clean_Grid,
  Set_Grid,
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

export const ClearGrid = () => {
  return {
    type: Clear_Grid,
  };
};
export const CleanGrid = () => {
  return {
    type: Clean_Grid,
  };
};
export const SetGrid = (grid) => {
  return {
    type: Set_Grid,
    payload: grid,
  };
};
export const SetAsExplored = ({ i, j }) => {
  return {
    type: Set_AS_Explored,
    payload: { i, j },
  };
};
export const SetAllAsExplored = (nodes) => {
  return {
    type: Set_All_As_Explored,
    payload: nodes,
  };
};
export const FixAllAsExplored = (nodes) => {
  return {
    type: Fix_All_As_Explored,
    payload: nodes,
  };
};

export const FixAsExplored = ({ i, j }) => {
  return {
    type: Fix_AS_Explored,
    payload: { i, j },
  };
};
export const SetAsPath = ({ i, j }) => {
  return {
    type: Set_As_Path,
    payload: { i, j },
  };
};
export const FixAsPath = ({ i, j }) => {
  return {
    type: Fix_As_Path,
    payload: { i, j },
  };
};
export const FixAllAsPath = (nodes) => {
  return {
    type: Fix_All_As_Path,
    payload: nodes,
  };
};

export const SetALLAsPath = (nodes) => {
  return {
    type: Set_All_As_Path,
    payload: nodes,
  };
};
