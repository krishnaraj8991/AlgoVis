import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import TheamSwitcher from "./components/TheamSwitcher";
// Store
import { Provider } from "react-redux";
import store from "./redux/store";
import ReduxContainer from "./ReduxContainer";
const theme = {
  light: false,
  LightTheme: {
    // color: css`rgba(0, 0, 0, 0.5)`,
    color: "#ff6c00",
    transitionColor: "#263859",
    // transitionColor: "mediumvioletred",
  },
  DarkTheme: {
    color: "#263859",
    transitionColor: "#ff6c00",
    // transitionColor: "darkorange",
  },
};
const App = () => {
  return (
    <>
      {/* Data Provider */}
      <Provider store={store}>
        {/* Theam Provider */}
        <ThemeProvider theme={theme}>
          <ReduxContainer />
        </ThemeProvider>
      </Provider>

      {/* <NevBar /> */}
      {/* <Plane /> */}
    </>
  );
};

export default App;
