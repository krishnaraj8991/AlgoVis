import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
const Title = styled.h2`
  color: white;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 10px;
`;

function AlgoTab() {
  const AlgoName = useSelector((state) => state.theme.algoName, shallowEqual);
  return (
    <>
      <Title>Visualizer : {AlgoName}</Title>
    </>
  );
}

export default AlgoTab;
