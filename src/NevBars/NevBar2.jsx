import React from "react";
import styled from "styled-components";

const NevBar = styled.div`
  position: fixed;
  height: 60px;
  width: 98%;
  /* top: -20px; */
  background-color: #242526;
  /* border: 1px solid #474a4d; */
  padding: 0 1rem;
  z-index: 1;
`;
const NavbarNav = styled.ul`
  max-width: 100%;
  height: 100%;
  margin: 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
function NevBar2(props) {
  return (
    <NevBar>
      <NavbarNav>{props.children}</NavbarNav>
    </NevBar>
  );
}

export default NevBar2;
