import React from "react";
import styled from "styled-components";
import { useState } from "react";

const Navitem = styled.li`
  width: calc(60px * 0.8);
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const IconButton = styled.a`
  --button-size: calc(60px * 0.4);
  width: var(--button-size);
  height: var(--button-size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 130%;
  padding: 5px;
  margin: 2px;
  transition: filter 500ms;
  background-color: gray;
  :hover {
    filter: brightness(1.3);
  }
  &.open {
    filter: brightness(1.5);
  }
  & svg {
    height: 20px;
    width: 20px;
    transform: translate(0%, 10%);
  }
`;
const Button = styled.div`
  --button-size: calc(60px * 0.4);
  width: auto;

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
    border-color: gray;

    filter: brightness(1.3);
  }
  &.open {
    transition: all 250ms;
    background-color: gray;
    border-color: gray;

    :hover {
      filter: brightness(1);
    }
  }
`;
const H2 = styled.h4`
  color: white;
  padding: 0.5rem;
`;
function NevItem(props) {
  const [open, setOpen] = useState(false);
  const { value, icon } = props;
  return (
    <>
      {value ? (
        <Navitem>
          <Button
            className={open ? " open" : ""}
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            <H2>{value}</H2>
          </Button>
          {open && props.children}
          {open && (
            <div
              style={{
                position: "fixed",
                top: "0px",
                left: "0px",
                height: "100%",
                width: "100%",
                backgroundColor: "transparent",
              }}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            ></div>
          )}
        </Navitem>
      ) : (
        <Navitem>
          <IconButton
            className={open ? " open" : ""}
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            {props.icon}
          </IconButton>
          {/* {props.children} */}
          {open && props.children}
          {open && (
            <div
              style={{
                position: "fixed",
                top: "0px",
                left: "0px",
                height: "100%",
                width: "100%",
                backgroundColor: "transparent",
                zIndex: "-1",
              }}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            ></div>
          )}
        </Navitem>
      )}
    </>
  );
}

export default NevItem;
