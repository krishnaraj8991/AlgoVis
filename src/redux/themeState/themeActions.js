import { flip, flip_Animation_State } from "./themeType";

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
