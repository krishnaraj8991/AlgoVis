import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CaretDown } from "../_Icons/caret-down.svg";
import { SetSize } from "../redux/graph/graphActions";

const Navitem = styled.li`
  width: calc(60px * 0.8);
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Button = styled.div`
  --button-size: calc(60px * 0.4);
  /* width: 200px; */

  height: var(--button-size);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 130%;
  padding: 5px;
  margin: 2px;
  transition: filter 250ms;
  border-style: solid;
  border-width: medium;
  border-color: transparent;
  :hover {
    /* background-color: gray; */

    /* filter: brightness(1.3); */
  }
  &.open {
    border-color: gray;
    transition: all 250ms;
    /* background-color: gray; */
    /* border-color: gray; */

    :hover {
      filter: brightness(1.3);
    }
  }
`;
const H2 = styled.h4`
  color: white;
  padding: 0.5rem;
`;
const Input = styled.input`
  background-color: gray;
  border: 1px solid #474a4d;
  border-radius: 5px;
  padding: 0.5rem;
  /* overflow: hidden; */
  /* filter: (1); */
`;

const Dropdown = styled.ul`
  position: fixed;
  top: 58px;
  background-color: #242526;
  border: 1px solid #474a4d;
  border-radius: 5px;
  padding: 0.5rem;
  /* overflow: hidden; */
  z-index: 1;
  filter: (1);
`;

const IconButton = styled.div`
  --button-size: calc(60px * 0.5);
  width: 40px;

  height: var(--button-size);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
  font-size: 130%;
  /* padding: 5px; */
  margin: 2px;
  transition: filter 500ms;
  :hover {
    filter: brightness(1.3);
  }
  &.down {
    transform: rotate(180deg);
  }
  & svg {
    height: 20px;
    width: 20px;
    transform: translate(0%, 5%);
  }
`;

const GridSize = () => {
  const Size = useSelector((state) => state.graph.size);
  const [offset, SetoffSet] = useState(0);
  const speed = useRef(2);
  const Interval = useRef(null);
  const Interval2 = useRef(null);
  const dispatch = useDispatch();
  //   const ClickHandler = (props) => {
  //     console.log(props, "clicked");
  //   };

  const MouseDownHandler = (trigger) => {
    // console.log(trigger, "mousedown");

    const offSet = () => {
      SetoffSet((prev) => {
        if (trigger == "Increment") {
          prev += speed.current;
        } else {
          prev -= speed.current;
        }
        if (Size + prev < 4) {
          return -(Size - 4);
        }
        return prev;
      });
    };
    offSet();
    Interval.current = setInterval(offSet, 100);
    Interval2.current = setInterval(() => {
      if (speed.current == 2) {
        speed.current += 8;
      }
      speed.current += 10;
    }, 2000);
  };
  const MouseLeaveHandler = () => {
    // console.log("mosue leave");
    clearInterval(Interval.current);
    clearInterval(Interval2.current);
    speed.current = 2;
    dispatch(SetSize(Size + offset));
    SetoffSet(0);
  };
  const MouseUpHandler = () => {
    // console.log("mosue up");
    clearInterval(Interval.current);
    clearInterval(Interval2.current);
    speed.current = 2;
    dispatch(SetSize(Size + offset));
    SetoffSet(0);
  };
  return (
    <Dropdown>
      <Button unselectable="on" className={"open"}>
        <H2>{Size + offset}</H2>
      </Button>
      <Button>
        <IconButton
          className={"down"}
          onMouseDown={() => {
            MouseDownHandler("Increment");
          }}
          onMouseUp={MouseUpHandler}
          onMouseLeave={MouseLeaveHandler}
        >
          <CaretDown />
        </IconButton>
        <IconButton
          className={""}
          onMouseDown={() => {
            MouseDownHandler("Decrement");
          }}
          onMouseUp={MouseUpHandler}
          onMouseLeave={MouseLeaveHandler}
        >
          <CaretDown />
        </IconButton>
      </Button>
    </Dropdown>
  );
};

export default GridSize;
