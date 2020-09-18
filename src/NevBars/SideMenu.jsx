import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropdownMenu from "./DropdownMenu";
import NevItem from "./NevItem";
import { FlipAnimationState } from "../redux/themeState/themeActions";
import { ReactComponent as CaretDown } from "../_Icons/caret-down.svg";
import { SetBoundarys } from "../redux/graph/graphActions";
function SideMenu() {
  const dispatch = useDispatch();
  // const animation = useSelector((state) => state.theme.animation);

  //   console.log(animation, "value");
  const dropdown = [
    {
      key: 1,
      switch: true,
      value: "Boundary",
      useOn: () => {
        const boundaryWalls = useSelector((state) => state.graph.boundaryWalls);
        const SetOn = () => {
          dispatch(SetBoundarys());
        };
        return [boundaryWalls, SetOn];
      },
    },
    {
      key: 2,
      switch: true,
      value: "Animation",
      useOn: () => {
        const animation = useSelector((state) => state.theme.animation);
        const SetOn = () => {
          dispatch(FlipAnimationState());
        };
        return [animation, SetOn];
      },
    },
    {
      key: 3,
      switch: true,
      value: "Something",
      useOn: () => {
        const [state, Setstate] = useState(false);
        const SetOn = () => {
          Setstate((prev) => !prev);
        };
        return [state, SetOn];
      },
      onFlip: () => {},
    },
  ];
  return (
    <NevItem icon={<CaretDown />}>
      <DropdownMenu right items={dropdown}></DropdownMenu>
    </NevItem>
  );
}

export default SideMenu;
