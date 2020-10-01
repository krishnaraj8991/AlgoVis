import React from "react";
import styled from "styled-components";
import Hex from "../components/Hive/Hex";
import {
  BlankNode,
  ExploredNode,
  PathNode,
  PortalNode1,
  StartNode,
  TargetNode,
  Wall,
} from "../redux/graph/graphStates";
const LegendText = styled.p`
  position: fixed;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  color: white;
`;

function Legend() {
  return (
    <>
      <Hex s={40} x={250} y={90} count={-1} val={BlankNode}></Hex>
      <Hex s={40} x={400} y={90} count={-2} val={ExploredNode}></Hex>
      <Hex s={40} x={550} y={90} count={-3} val={PathNode}></Hex>
      <Hex s={40} x={700} y={90} count={-4} val={Wall}></Hex>
      <Hex s={40} x={850} y={90} count={-5} val={StartNode}></Hex>
      <Hex s={40} x={1000} y={90} count={-6} val={TargetNode}></Hex>
      <Hex s={40} x={1150} y={90} count={-7} val={PortalNode1}></Hex>
      <LegendText left={200} top={95}>
        Unvisited Nodes
      </LegendText>
      <LegendText left={350} top={95}>
        Explored Nodes
      </LegendText>
      <LegendText left={500} top={95}>
        Final Path Nodes
      </LegendText>
      <LegendText left={685} top={95}>
        Wall
      </LegendText>
      <LegendText left={815} top={95}>
        Start Node
      </LegendText>
      <LegendText left={955} top={95}>
        Target Node
      </LegendText>
      <LegendText left={1125} top={95}>
        Portals
      </LegendText>
    </>
  );
}

export default Legend;
