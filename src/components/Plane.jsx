import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Circle from "./Circle";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: aquamarine;
  /* padding: 1rem; */
`;

const Plane = () => {
  const ref = useRef(null);
  useEffect(() => {
    //   ref.curre
    // const style = ref.current.style;
    // style.height = "10rem";

    // style.backgroundColor = "Red";
    console.log(ref.current.style);
  }, []);
  return (
    <Div ref={ref}>
      <Circle size={"300px"} />
    </Div>
  );
};

export default Plane;
