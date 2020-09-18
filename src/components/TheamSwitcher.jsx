import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as Moon } from "../_Icons/crescent-moon-svgrepo-com.svg";
import { ReactComponent as Sun } from "../_Icons/sun-svgrepo-com.svg";
import { useRef } from "react";
import { Flip } from "../redux/themeState/themeActions";
import { useDispatch, useSelector } from "react-redux";

const Sheet = styled.div`
  /* height: 50px;
  width: 50px; */
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  position: relative;
  height: 25px;
  width: 50px;
  border-radius: 20px;
  background-color: #263859;
  display: flex;
  align-items: center;
  transition: all 250ms ease-in;
  overflow: hidden;
`;
const Switch = styled.div`
  position: absolute;
  height: 100%;
  width: 50%;
  border-radius: 50%;
  background-color: gray;
  transition: transform 300ms ease-out;
  box-shadow: 1px 1px 8px 2px #263859;
  transform: ${(props) =>
    props.on == "true" ? css`translateX(0%)` : css`translateX(100%)`};
`;
const OnPlane = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 20px;
  background-color: #ff6c00;
  transition: transform 300ms ease-out;
  transform: ${(props) =>
    !(props.on == "true") ? css`translateX(50%)` : css`translateX(0%)`};
`;
function TheamSwitcher(props) {
  const switchref = useRef(null);
  const dispatch = useDispatch();
  const on = useSelector((state) => state.theme.light);
  // useEffect(() => {
  //   let switchstyle = switchref.current.style;
  // }, [props.on]);
  return (
    <Sheet>
      <Container
        onClick={() => {
          dispatch(Flip());
        }}
        on={on.toString()}
      >
        <OnPlane on={on.toString()} />
        <Switch ref={switchref} on={on.toString()}>
          {on ? <Sun /> : <Moon />}
        </Switch>
      </Container>
    </Sheet>
  );
}

export default TheamSwitcher;
