import { flip, flip_Animation_State, Play_Pause } from "./themeType";

export const Flip = () => {
  return {
    type: flip,
  };
};
export const FlipAnimationState = () => {
  return {
    type: flip_Animation_State,
  };
};

export const PlayPauseAction = () => {
  return {
    type: Play_Pause,
  };
};
