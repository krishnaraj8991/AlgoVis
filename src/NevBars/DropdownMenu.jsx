import React from "react";
import styled from "styled-components";

const Dropdown = styled.div`
  position: absolute;
  top: 58px;
  width: 300px;
  transform: translatex(-45%);
  background-color: #242526;
  border: 1px solid #474a4d;
  border-radius: 5px;
  padding: 0.5rem;
  /* overflow: hidden; */
  filter: (1);
`;
const DropdownItem = styled.a`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  transition: background-color 200ms;
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: #474a4d;

  :hover {
    filter: brightness(1.2);
  }
`;
const IconButton = styled.a`
  --button-size: calc(60px * 0.5);
  width: var(--button-size);
  height: var(--button-size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
  font-size: 130%;
  padding: 5px;
  margin: 5px;
  transition: filter 500ms;
  :hover {
    filter: brightness(1.3);
  }
  & svg {
    height: 20px;
    width: 20px;
    transform: translate(0%, 10%);
  }
`;

function DropdownMenu() {
  function DropdownItems(props) {
    return (
      <DropdownItem>
        <IconButton>{props.leftIcon}</IconButton>
        {props.children}
        {props.rightIcon && <IconButton>{props.rightIcon}</IconButton>}
      </DropdownItem>
    );
  }
  return (
    <Dropdown>
      <DropdownItems leftIcon={"🍕"}>Hello</DropdownItems>
      <DropdownItems leftIcon={"🍕"}>Hello</DropdownItems>
    </Dropdown>
  );
}

export default DropdownMenu;
