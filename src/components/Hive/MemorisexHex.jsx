import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetAsWall } from "../../redux/graph/graphActions";
import Hex from "./Hex";
function MemorisexHex(props) {
  const { i, j, ...remainingProps } = props;
  //   console.log(i, j);

  const val = useSelector((state) => state.graph.graph[i][j]);

  const dispatch = useDispatch();
  const ClickHandler = () => {
    // console.log(i, ",", j, "clicked", val);
    dispatch(SetAsWall({ i, j }));
  };
  const OverHandler = (e) => {
    if (e.shiftKey && e.target.id == "") {
      //   console.log("mouseOver", e.target.id);
      //   e.stopPropagation();
      //   console.log(i, ",", j, "clicked", val);
      dispatch(SetAsWall({ i, j }));
    }
  };
  return (
    <div onClick={ClickHandler} onMouseOver={OverHandler}>
      <Hex {...remainingProps} val={val}></Hex>
    </div>
  );
}

export default MemorisexHex;
