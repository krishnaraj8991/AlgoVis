import React from "react";
import styled from "styled-components";
import useMediaQuery from "../hooks/useMediaQuery";
const NevBarContainer = styled.div`
  position: fixed;
  height: 60px;
  width: 99%;
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
  justify-content: flex-start;
  /* flex: 2 2 auto; */
  align-items: center;
  & > * {
    flex: 0 1 auto;
  }
  & #cl1,
  #cl2 {
    flex: 2 1 auto;
  }
`;
// & #cl2 {
//   flex: 0 1 auto;
// }
// & #cl3 {
//   flex: 0 1 100;
// }
function NevBar(props) {
  const matches = useMediaQuery("(min-width: 600px)");

  return (
    <NevBarContainer>
      {/* {console.log(matches)} */}
      {matches ? (
        <NavbarNav>{props.children}</NavbarNav>
      ) : (
        <NavbarNav>{props.children}</NavbarNav>
      )}
    </NevBarContainer>
  );
}

export default NevBar;
