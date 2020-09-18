import React from "react";
import styled, { css } from "styled-components";
import Switchs from "../components/Switch";

const Dropdown = styled.ul`
  position: fixed;
  top: 58px;

  ${(props) =>
    props.right &&
    css`
      transform: translatex(-90%);
    `};

  /* transform: translatex(-90%); */
  background-color: #242526;
  border: 1px solid #474a4d;
  border-radius: 5px;
  padding: 0.5rem;
  /* overflow: hidden; */
  filter: (1);
`;
const DropdownItem = styled.li`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;
  transition: background-color 200ms;
  /* padding: 0.5rem; */
  margin: 0.5rem;
  background-color: #474a4d;

  :hover {
    filter: brightness(1.2);
  }
`;
const H2 = styled.h4`
  color: white;
  padding: 0.5rem;
  margin: 1rem;
`;
const IconButton = styled.div`
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

function DropdownMenu(props) {
  // console.log(props.items);
  function DropdownItems(props) {
    return (
      <DropdownItem
        key={props.value + " item"}
        onClick={() => {
          !props.switch && props.onClick();
        }}
      >
        {props.leftIcon && <IconButton>{props.leftIcon}</IconButton>}
        {props.value && <H2>{props.value}</H2>}
        {props.rightIcon && <IconButton>{props.rightIcon}</IconButton>}
        {props.switch && <Switchs key={props.value + " switch"} {...props} />}
      </DropdownItem>
    );
  }
  return (
    <Dropdown right={props.right}>
      {props.items.map((item) => {
        return <DropdownItems key={item.value} {...item}></DropdownItems>;
      })}
    </Dropdown>
  );
}

export default DropdownMenu;
