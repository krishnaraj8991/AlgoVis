import { Set_AS_WALL } from "./graphTypes";

export const SetAsWall = ({ i, j }) => {
  return {
    type: Set_AS_WALL,
    payload: { i, j },
  };
};
