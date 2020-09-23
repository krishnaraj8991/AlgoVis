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
    display: flex;
    justify-content: flex-start;
    flex: 0 1 auto;
    width: auto;
    /* min-width: 130px; */
  }
  /* & #cl2 {
    flex: 3 1 auto;
  } */

  & #cl5 {
    flex: 2 1 auto;
  }

  & #cl2 {
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, -50%);
  }
`;
const NavbarNavCol = styled.ul`
  max-width: 100%;
  height: 100%;
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* flex: 2 2 auto; */
  align-items: center;
  & > * {
    flex: 0 1 auto;
    min-width: auto;
  }
  & #cl5 {
    flex: 2 1 auto;
    min-width: 150px;
  }
  & #cl2 {
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, -50%);
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
        <NavbarNavCol>{props.children}</NavbarNavCol>
      )}
    </NevBarContainer>
  );
}

export default NevBar;
