import React, { useEffect, useState, useRef } from "react";
import Hex from "./Hex";
import styled from "styled-components";
import { isCompositeComponentWithType } from "react-dom/test-utils";
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
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};
const Frame = styled.div`
  position: absolute;
  height: 210%;
  width: 210%;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0);

  /* animation: all 1s ease; */
`;
export default function Hive(props) {
  const [Hexgrid, setHexgrid] = useState([]);
  const [HexData, setHexData] = useState([]);
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const DataSize = 20;
  const [hexsize, setSize] = useState(110);
  let RefisAutoScroll = useRef(false);
  let StartPos = useRef({ x: 0, y: 0 });
  let CurrentPos = useRef({ x: 0, y: 0 });
  let AutoScrollInterval = useRef(null);
  // let deltax = 0;
  // let deltay = 0;
  let jLimit = 22;
  let iLimit = 8;

  // Initialize data grid
  useEffect(() => {
    RefisAutoScroll = false;
    CurrentPos = { x: 0, y: 0 };
    StartPos = { x: 0, y: 0 };
    console.log(DataSize);
    let ar = [];
    let leng = DataSize;
    for (let i = 0; i < leng; i++) {
      ar[i] = [];
      for (let j = 0; j < leng; j++) {
        ar[i][j] = i * j;
      }
    }
    // ar[3][3] = 6;
    setHexData(ar);
    console.log(ar);
  }, []);

  useEffect(() => {
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
  }, [hexsize, window.innerWidth]);

  const frameScroll = (deltax, deltay) => {
    let fram = document.getElementById("hive");
    if (fram) {
      if (!fram.style.top || !fram.style.left) {
        fram.style.top = `0px`;
        fram.style.left = `0px`;
      }
      let currnety = parseInt(fram.style.top);
      let currentx = parseInt(fram.style.left);
      let posy = currnety - deltay;
      let posx = currentx - deltax;

      fram.style.top = `${posy}px`;
      fram.style.left = `${posx}px`;

      if (posy > (((hexsize - 70) / 60) * 46 + 25) * 2) {
        // fram.style.top = `0px`;

        posy = posy % ((((hexsize - 70) / 60) * 46 + 25) * 2);
        fram.style.top = `${posy}px`;
        setDelta((prev) => ({
          ...prev,
          y: prev.y + ((DataSize - 2) % (DataSize * 3)),
        }));
      }
      if (posy < -((((hexsize - 70) / 60) * 46 + 25) * 2)) {
        // fram.style.top = `0px`;
        posy = -posy;
        posy = posy % ((((hexsize - 70) / 60) * 46 + 25) * 2);
        posy = -posy;
        fram.style.top = `${posy}px`;
        setDelta((prev) => ({ ...prev, y: prev.y + 2 }));
      }
      if (posx > ((hexsize - 100) / 30) * 23 + 50) {
        // fram.style.left = `0px`;
        let multiple = parseInt(posx / (((hexsize - 100) / 30) * 23 + 50));

        posx = posx % (((hexsize - 100) / 30) * 23 + 50);
        fram.style.left = `${posx}px`;
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
        fram.style.left = `${posx}px`;
        setDelta((prev) => ({ ...prev, x: prev.x + multiple * 1 }));
        // fram.style.left = `0px`;
      }
    }
  };

  // Remaining to implement
  const autoscroll = ({ x, y }) => {
    // let currentx = e.clientX;
    // let currenty = e.clientY;
    let currentx = x;
    let currenty = y;
    let deltax = currentx - StartPos.x;
    let deltay = currenty - StartPos.y;
    // console.log(deltax, deltay);
    frameScroll(deltax / 3, deltay / 3);
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
    if (e.buttons == 4) {
      console.log(RefisAutoScroll);
      if (RefisAutoScroll == undefined) {
        RefisAutoScroll = false;
      }
      if (!RefisAutoScroll) {
        console.log("mouseDown");
        let frame = document.getElementById("hive");
        frame.style.cursor = "all-scroll";
        StartPos = { x: e.clientX, y: e.clientY };
        console.log(StartPos);
        RefisAutoScroll = true;
        AutoScrollInterval = setInterval(() => {
          autoscroll(CurrentPos);
        }, 10);
      }
    }
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
    if (RefisAutoScroll) {
      console.log("clearing event");
      let frame = document.getElementById("hive");
      frame.style.cursor = "auto";
      RefisAutoScroll = false;
      clearInterval(AutoScrollInterval);
    }
    // setIsAutoScroll(false);
    // let frame = document.getElementById("hive");
    // frame.style.cursor = "auto";
  };
  const keypress = (e) => {
    console.log("keypressed");
    if (e.key == "d") {
      setDelta((prev) => ({ ...prev, x: prev.x + 1 }));
    } else if (e.key == "a") {
      setDelta((prev) => ({ ...prev, x: prev.x + DataSize - 1 }));
    } else if (e.key == "w") {
      setDelta((prev) => ({ ...prev, y: prev.y + 2 }));
    } else if (e.key == "s") {
      setDelta((prev) => ({ ...prev, y: prev.y + DataSize - 2 }));
    }
  };

  useEffect(() => {
    console.log("Listener Added");
    window.addEventListener("mousedown", logMousedown);
    window.addEventListener("mousemove", logMousemove);
    window.addEventListener("mouseup", logmouseUp);
    window.addEventListener("wheel", scroll);
    window.addEventListener("keypress", keypress);
    return () => {
      console.log("Listener removed");
      // window.removeEventListener("mousedown", logMousePosition);
      window.removeEventListener("mousedown", logMousedown);
      window.removeEventListener("mousemove", logMousemove);
      window.removeEventListener("mouseup", logmouseUp);
    };
  }, []);
  return (
    <>
      <div style={Base}>
        {/* <Base> */}
        <Frame left={"0px"} top={"0px"} id="hive">
          {/* {Hexgrid.map((hex) => hex)} */}
          {Hexgrid.map((hex, idx) => (
            <Hex
              key={hex[0]}
              count={hex[0]}
              s={hex[1] - 40}
              x={hex[2]}
              y={hex[3]}
              z={0}
              // val={hex[4].toString()}
              // val={(hex[4][1] + delta.x) % DataSize}
              val={
                HexData[(hex[4][0] + delta.y) % DataSize][
                  (hex[4][1] + delta.x) % DataSize
                ]
              }
            />
          ))}
        </Frame>
        {/* </Base> */}
      </div>
    </>
  );
}
