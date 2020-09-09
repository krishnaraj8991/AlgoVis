import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import { MenuIcon } from "@material-ui/icons/Menu";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// import MenuIcon from "@material-ui/icons/Menu";
// import AddIcon from "@material-ui/icons/Add";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import {
  //   InputLabel,
  //   Select,
  //   FormControl,
  //   rgbToHex,
  // IconButton,
  Button,
  // Typography,
  Toolbar,
  AppBar,
  makeStyles,
  MenuItem,
  Menu,
  Fab,
} from "@material-ui/core";
import { useState } from "react";
import { red } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  h2: {
    color: red,
  },
}));

function NevBar({ age }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, SetSelected] = useState("Algos");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (val) => {
    SetSelected(val);
    setAnchorEl(null);
  };
  const algos = [
    "Dijkstra's Algo",
    "A* Search",
    "Greedy Best-first Search",
    "Swarm Algorithm",
    "convergent Swarm Algo",
    "Depth-first Search",
    "Breadth-first Search",
  ];
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button className={classes.algos} onClick={handleClick}>
            <h5 style={{ color: "white" }}>{selected}</h5>
            <KeyboardArrowDownIcon />
          </Button>
          <Menu
            position="bottom"
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => {
              handleClose("open menu");
            }}
          >
            {algos.map((algo) => (
              <MenuItem
                onClick={() => {
                  handleClose(algo);
                }}
              >
                {algo}
              </MenuItem>
            ))}
          </Menu>
          <div
            style={{
              position: "absolute",
              top: "2rem",
              left: "50%",
              transform: "translate(-50%,0%)",
            }}
          >
            <Fab className={classes.title} color="primary" aria-label="add">
              <PlayArrowIcon />
            </Fab>
          </div>

          <Button
            color="inherit"
            onClick={() => {
              console.log("login clicked");
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NevBar;
