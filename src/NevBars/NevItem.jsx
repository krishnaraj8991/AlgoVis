import React from "react";
import styled from "styled-components";
import { useState } from "react";

const Navitem = styled.li`
  width: calc(60px * 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IconButton = styled.a`
  --button-size: calc(60px * 0.4);
  width: var(--button-size);
  height: var(--button-size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
  font-size: 130%;
  padding: 5px;
  margin: 2px;
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
function NevItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <Navitem>
      <IconButton
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {props.icon}
      </IconButton>
      {open && props.children}
    </Navitem>
  );
}

export default NevItem;
