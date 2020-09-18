import React, { useEffect, useState, useRef, Suspense, lazy } from "react";
// import Hex from "./Hex";
import styled, { css } from "styled-components";
// import cursorAll from "../../_Icons/Cursor/Filled/cursor-AutoScroll-All.png";
// import cursorUp from "../../_Icons/Cursor/Filled/cursor-AutoScroll-up.png";
// import cursorDown from "../../_Icons/Cursor/Filled/cursor-AutoScroll-down.png";
// import cursorLeft from "../../_Icons/Cursor/Filled/cursor-AutoScroll-left.png";
// import cursorRight from "../../_Icons/Cursor/Filled/cursor-AutoScroll-right.png";

import { useDispatch, useSelector } from "react-redux";
import { SetAsWall } from "../../redux/graph/graphActions";
// import MemorisexHex from "./MemorisexHex";

import {
  cursorAll,
  cursorDown,
  cursorLeft,
  cursorRight,
  cursorUp,
  cursorDownLeft,
  cursorDownRight,
  cursorUpLeft,
  cursorUpRight,
} from "../../_Icons/Cursor/Filled";
import Loading from "../Loading";
const MemorisexHex = React.lazy(() => import("./MemorisexHex"));

// import Path from "./Path";
// import Cube from "./Cube";

const Base = {
  position: "relative",
  height: "150%",
  width: "140%",
  top: "-200px",
  left: "-170px",

  // overflow: "hidden",
  /* // overflowX: "hidden",
  // overflowY: "hidden", */
  backgroundColor: "transparent",
  // backgroundColor: "rgba(0, 0, 0, 0.5)",
};
const Frame = styled.div`
  position: absolute;
  height: 210%;
  width: 210%;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  overflow: hidden;
  background-color: transparent;
  transform: translate(0px, 0px);
  /* -webkit-transform: translateZ(0); */
  cursor: ${(props) => {
    if (props.cursor == "custom") {
      return `url(${cursorAll}), auto`;
    } else if (props.cursor == "custom-up") {
      return `url(${cursorUp}), auto`;
    } else if (props.cursor == "custom-down") {
      return `url(${cursorDown}), auto`;
    } else if (props.cursor == "custom-right") {
      return `url(${cursorRight}), auto`;
    } else if (props.cursor == "custom-left") {
      return `url(${cursorLeft}), auto`;
    } else if (props.cursor == "custom-up-left") {
      return `url(${cursorUpLeft}), auto`;
    } else if (props.cursor == "custom-up-right") {
      return `url(${cursorUpRight}), auto`;
    } else if (props.cursor == "custom-down-right") {
      return `url(${cursorDownRight}), auto`;
    } else if (props.cursor == "custom-down-left") {
      return `url(${cursorDownLeft}), auto`;
    } else {
      return "auto";
    }
  }};

  /* animation: all 1s ease; */
`;

function getTranslateValues(element) {
  const style = window.getComputedStyle(element);
  const matrix = style["transform"] || style.mozTransform;

  // No transform property. Simply return 0 values.
  if (matrix === "none") {
    return {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  // Can either be 2d or 3d transform
  const matrixType = matrix.includes("3d") ? "3d" : "2d";
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");

  // 2d matrices have 6 values
  // Last 2 values are X and Y.
  // 2d matrices does not have Z value.
  if (matrixType === "2d") {
    return {
      x: matrixValues[4],
      y: matrixValues[5],
      z: 0,
    };
  }

  // 3d matrices have 16 values
  // The 13th, 14th, and 15th values are X, Y, and Z
  if (matrixType === "3d") {
    return {
      x: matrixValues[12],
      y: matrixValues[13],
      z: matrixValues[14],
    };
  }
}

export default function Hive(props) {
  /**
   * Hive Component displays a hexagonal grid
   * It should be inside a relative div container
   * and the container should set overflow property to hidden
   * It taks no props
   */

  /*
    Stores the Hex Divs which are shown on the screen
    only updates when the Display size changes other wise it stays constant
   */
  const [Hexgrid, setHexgrid] = useState([]);
  /*
   stores the relative postion of grid plane to the Graph
   starts at x:0 y:0 which means top left corner of the graph
   it is updated every tume the grid plane is shifted
  */
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  let DataSize = 10;
  const [hexsize, setSize] = useState(110);
  let width = useRef(-1);

  // Used For AutoScroll
  let RefisAutoScroll = useRef(false); //Bool indicating autoscrolling is on or not
  let StartPos = useRef({ x: 0, y: 0 }); //starting position of mouse pointer during autoscroll
  let CurrentPos = useRef({ x: 0, y: 0 }); //current position of mouse pointer during autoscroll
  let AutoScrollInterval = useRef(null); //Stores setInterval (used to periodically call scroll function)

  // left mouse button down from child component reference
  let LeftButtonDown = useRef(false);

  const [cursor, setCursor] = useState("auto");
  // let deltax = 0;
  // let deltay = 0;
  let jLimit = 22;
  let iLimit = 8;

  // Initialize data grid
  let ar = useSelector((state) => state.graph.graph);
  DataSize = useSelector((state) => state.graph.size);
  const dispatch = useDispatch();

  useEffect(() => {
    RefisAutoScroll = false;
    CurrentPos = { x: 0, y: 0 };
    StartPos = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    console.log(width.current, window.innerWidth);
    var wh = window.innerWidth;
    if (width.current < wh || width?.current == -1) {
      width.current = window.innerWidth;

      console.log("heavy function running");
      let count = 0;
      let temp = [];
      let dtemp = [];

      // let startx = -((hexsize / 100) * 48 + 25);
      // let starty = -140;
      let startx = 80;
      let starty = 80;
      var w = window.innerWidth;
      var h = window.innerHeight;
      console.log(w, h);
      // jLimit = parseInt(w / (((hexsize - 90) / 60) * 48 + 25) + 4);
      // iLimit = parseInt(h / (((hexsize - 90) / 60) * 46 + 25) + 4);
      jLimit = w / 40;
      iLimit = h / 45;
      for (let i = 0; i < iLimit; i++) {
        let tempup = [];
        for (let j = 0; j < jLimit; j++) {
          count += 1;
          tempup = [
            ...tempup,
            [
              count,
              hexsize,
              i % 2 === 0
                ? startx + j * (((hexsize - 70) / 60) * 48 + 25)
                : startx +
                  j * (((hexsize - 70) / 60) * 48 + 25) +
                  (((hexsize - 70) / 60) * 25 + 12), //12
              starty, //((hexsize - 70) / 60) * 46 + 2,
              [i, j],
              // i % 2 === 1 ? count + jLimit : count,
            ],
          ];
        }

        temp = [...temp, ...tempup];
        // count += jLimit;
        starty += ((hexsize - 70) / 60) * 46 + 25; //25; //((hexsize - 70) / 60) * 48 + 94; //142
      }
      // console.log(iLimit, jLimit, dtemp);
      console.log(temp.length);

      setHexgrid(temp);
    }
  }, [hexsize, window.innerWidth]);

  // Frame Scroll with Transform translate
  const frameScroll = (deltax, deltay) => {
    let fram = document.getElementById("hive");
    if (fram) {
      const frame = fram;
      if (!fram.style.transform) {
        fram.style.transform = "translate(0px,0px)";
      }
      // let currnety = parseInt(fram.style.top);
      // let currentx = parseInt(fram.style.left);
      const { x: currentx, y: currnety, z } = getTranslateValues(frame);
      // console.log(currentx, currnety);
      let posy = currnety - deltay;
      let posx = currentx - deltax;
      // console.log(posx, posy, fram.style.transform.match(/[\d\.]+|\D+/g));
      fram.style.transform = `translate(${posx}px,${posy}px)`;
      // fram.style.top = `${posy}px`;
      // fram.style.left = `${posx}px`;

      if (posy > (((hexsize - 70) / 60) * 46 + 25) * 2) {
        // fram.style.top = `0px`;
        let multiple = parseInt(posy / ((((hexsize - 70) / 60) * 46 + 25) * 2));
        posy = posy % ((((hexsize - 70) / 60) * 46 + 25) * 2);

        fram.style.transform = `translate(${posx}px,${posy}px)`;
        // fram.style.top = `${posy}px`;
        setDelta((prev) => ({
          ...prev,
          y: prev.y + ((multiple * (DataSize - 2)) % (DataSize * 3)),
        }));
      }
      if (posy < -((((hexsize - 70) / 60) * 46 + 25) * 2)) {
        // fram.style.top = `0px`;
        posy = -posy;
        let multiple = parseInt(posy / ((((hexsize - 70) / 60) * 46 + 25) * 2));
        posy = posy % ((((hexsize - 70) / 60) * 46 + 25) * 2);
        posy = -posy;

        fram.style.transform = `translate(${posx}px,${posy}px)`;
        // fram.style.top = `${posy}px`;
        setDelta((prev) => ({ ...prev, y: prev.y + multiple * 2 }));
      }
      if (posx > ((hexsize - 100) / 30) * 23 + 50) {
        // fram.style.left = `0px`;
        let multiple = parseInt(posx / (((hexsize - 100) / 30) * 23 + 50));

        posx = posx % (((hexsize - 100) / 30) * 23 + 50);

        fram.style.transform = `translate(${posx}px,${posy}px)`;
        // fram.style.left = `${posx}px`;
        setDelta((prev) => ({
          ...prev,
          x: prev.x + ((multiple * (DataSize - 1)) % (DataSize * 3)),
        }));
      }
      if (posx < -(((hexsize - 100) / 30) * 23 + 50)) {
        // fram.style.left = `0px`;
        posx = -posx;
        let multiple = parseInt(posx / (((hexsize - 100) / 30) * 23 + 50));
        posx = posx % (((hexsize - 100) / 30) * 23 + 50);
        posx = -posx;

        fram.style.transform = `translate(${posx}px,${posy}px)`;
        // fram.style.left = `${posx}px`;
        setDelta((prev) => ({ ...prev, x: prev.x + multiple * 1 }));
        // fram.style.left = `0px`;
      }
    }
  };

  /* Frame scroll with absolute positions */
  // const frameScroll = (deltax, deltay) => {
  //   let fram = document.getElementById("hive");
  //   if (fram) {
  //     if (!fram.style.top || !fram.style.left) {
  //       fram.style.top = `0px`;
  //       fram.style.left = `0px`;
  //     }
  //     let currnety = parseInt(fram.style.top);
  //     let currentx = parseInt(fram.style.left);
  //     let posy = currnety - deltay;
  //     let posx = currentx - deltax;

  //     fram.style.top = `${posy}px`;
  //     fram.style.left = `${posx}px`;

  //     if (posy > (((hexsize - 70) / 60) * 46 + 25) * 2) {
  //       // fram.style.top = `0px`;

  //       posy = posy % ((((hexsize - 70) / 60) * 46 + 25) * 2);
  //       fram.style.top = `${posy}px`;
  //       setDelta((prev) => ({
  //         ...prev,
  //         y: prev.y + ((DataSize - 2) % (DataSize * 3)),
  //       }));
  //     }
  //     if (posy < -((((hexsize - 70) / 60) * 46 + 25) * 2)) {
  //       // fram.style.top = `0px`;
  //       posy = -posy;
  //       posy = posy % ((((hexsize - 70) / 60) * 46 + 25) * 2);
  //       posy = -posy;
  //       fram.style.top = `${posy}px`;
  //       setDelta((prev) => ({ ...prev, y: prev.y + 2 }));
  //     }
  //     if (posx > ((hexsize - 100) / 30) * 23 + 50) {
  //       // fram.style.left = `0px`;
  //       let multiple = parseInt(posx / (((hexsize - 100) / 30) * 23 + 50));

  //       posx = posx % (((hexsize - 100) / 30) * 23 + 50);
  //       fram.style.left = `${posx}px`;
  //       setDelta((prev) => ({
  //         ...prev,
  //         x: prev.x + ((multiple * (DataSize - 1)) % (DataSize * 3)),
  //       }));
  //     }
  //     if (posx < -(((hexsize - 100) / 30) * 23 + 50)) {
  //       // fram.style.left = `0px`;
  //       posx = -posx;
  //       let multiple = parseInt(posx / (((hexsize - 100) / 30) * 23 + 50));
  //       posx = posx % (((hexsize - 100) / 30) * 23 + 50);
  //       posx = -posx;
  //       fram.style.left = `${posx}px`;
  //       setDelta((prev) => ({ ...prev, x: prev.x + multiple * 1 }));
  //       // fram.style.left = `0px`;
  //     }
  //   }
  // };

  const autoscroll = ({ x, y }) => {
    // let currentx = e.clientX;
    // let currenty = e.clientY;
    if (!RefisAutoScroll) {
      setCursor("auto");
      return;
    }
    let currentx = x;
    let currenty = y;
    let deltax = currentx - StartPos.x;
    let deltay = currenty - StartPos.y;

    if (Math.abs(deltax) > 20 && Math.abs(deltay) > 20) {
      if (deltax > 0 && deltay < 0) {
        if (cursor != "custom-up-right") {
          setCursor("custom-up-right");
        }
      } else if (deltax < 0 && deltay < 0) {
        if (cursor != "custom-up-left") {
          setCursor("custom-up-left");
        }
      }
      if (deltax > 0 && deltay > 0) {
        if (cursor != "custom-down-right") {
          setCursor("custom-down-right");
        }
      } else if (deltax < 0 && deltay > 0) {
        if (cursor != "custom-down-left") {
          setCursor("custom-down-left");
        }
      }
      deltax = Math.abs(deltax) < 60 ? deltax / 2 : deltax;
      deltay = Math.abs(deltay) < 60 ? deltay / 2 : deltay;

      frameScroll(deltax, deltay);
    } else if (Math.abs(deltax) > 20 || Math.abs(deltay) > 20) {
      if (Math.abs(deltax) < Math.abs(deltay)) {
        if (deltay > 0) {
          if (cursor != "custom-down") {
            setCursor("custom-down");
          }
        } else {
          if (cursor != "custom-up") {
            setCursor("custom-up");
          }
        }
      } else {
        if (deltax > 0) {
          if (cursor != "custom-right") {
            setCursor("custom-right");
          }
        } else {
          if (cursor != "custom-left") {
            setCursor("custom-left");
          }
        }
      }
      deltax = Math.abs(deltax) < 60 ? deltax / 2 : deltax;
      deltay = Math.abs(deltay) < 60 ? deltay / 2 : deltay;
      frameScroll(deltax, deltay);
    } else {
      if (cursor != "custom") {
        setCursor("custom");
      }
    }
    // console.log(e);
  };
  const scroll = (e) => {
    let deltax = e.deltaX;
    let deltay = e.deltaY;
    if (e.shiftKey) {
      deltax = e.deltaY;
      deltay = 0;
    }

    frameScroll(deltax / 5, deltay / 5);
  };

  const logMousedown = (e) => {
    if (e.button == 0) {
      LeftButtonDown.current = true;
      // console.log("left click");
    }
    if (e.buttons == 4) {
      if (RefisAutoScroll == undefined) {
        RefisAutoScroll = false;
      }
      if (!RefisAutoScroll) {
        let frame = document.getElementById("hive");
        setCursor("custom");
        StartPos = { x: e.clientX, y: e.clientY };
        RefisAutoScroll = true;
        // AutoScrollInterval = setInterval(() => {
        //   autoscroll(CurrentPos);
        // }, 10);
        const ScrollCaller = () => {
          autoscroll(CurrentPos);
          if (RefisAutoScroll) {
            window.requestAnimationFrame(ScrollCaller);
          }
        };
        window.requestAnimationFrame(ScrollCaller);
      }
    }
    // if(e.buttons)
  };

  const logMousemove = (e) => {
    CurrentPos = { x: 0, y: 0 };
    CurrentPos.x = e.clientX;
    CurrentPos.y = e.clientY;
    // console.log(CurrentPos);
    // if (RefisAutoScroll) {
    //   autoscroll(e);
    // }
  };
  const logmouseUp = () => {
    LeftButtonDown.current = false;
    if (RefisAutoScroll) {
      setCursor("auto");
      RefisAutoScroll = false;
      // clearInterval(AutoScrollInterval);
    }
    // setIsAutoScroll(false);
    // let frame = document.getElementById("hive");
    // frame.style.cursor = "auto";
  };
  const keypress = (e) => {
    // console.log("keypressed");
    // if (e.key == "d") {
    //   setDelta((prev) => ({ ...prev, x: prev.x + 1 }));
    // } else if (e.key == "a") {
    //   setDelta((prev) => ({ ...prev, x: prev.x + DataSize - 1 }));
    // } else if (e.key == "w") {
    //   setDelta((prev) => ({ ...prev, y: prev.y + 2 }));
    // } else if (e.key == "s") {
    //   setDelta((prev) => ({ ...prev, y: prev.y + DataSize - 2 }));
    // }
  };

  const logMouseOver = (e) => {
    if (e.buttons === 1 && e.target.className == "value") {
      console.log(e.target.dataset);
      const { i, j } = e.target.dataset;
      dispatch(SetAsWall({ i, j }));
    }
  };
  useEffect(() => {
    console.log("Listener Added");
    window.addEventListener("mousedown", logMousedown);
    window.addEventListener("mousemove", logMousemove);
    window.addEventListener("mouseup", logmouseUp);
    window.addEventListener("wheel", scroll);
    window.addEventListener("keypress", keypress);
    // window.addEventListener("mouseover", logMouseOver);
    return () => {
      console.log("Listener removed");
      // window.removeEventListener("mousedown", logMousePosition);
      window.removeEventListener("mousedown", logMousedown);
      window.removeEventListener("mousemove", logMousemove);
      window.removeEventListener("mouseup", logmouseUp);
      window.removeEventListener("wheel", scroll);
      window.removeEventListener("keypress", keypress);
    };
  }, []);
  const HexClicked = (i, j) => {};
  return (
    <>
      <div style={Base}>
        {/* <Base> */}
        <Frame left={"0px"} top={"0px"} id="hive" cursor={cursor}>
          {/* {Hexgrid.map((hex) => hex)} */}

          <Suspense fallback={<Loading />}>
            {Hexgrid.map((hex, idx) => (
              <MemorisexHex
                key={`${hex[4][0]},${hex[4][1]}`}
                count={`${hex[4][0]},${hex[4][1]}`}
                s={hex[1] - 40}
                x={hex[2]}
                y={hex[3]}
                i={(hex[4][0] + delta.y) % DataSize}
                j={(hex[4][1] + delta.x) % DataSize}
                width={width.current}
                LeftButtonDown={LeftButtonDown}

                // moving={moving}
              />
            ))}
          </Suspense>
        </Frame>
        {/* </Base> */}
      </div>
    </>
  );
}
