const { Switch } = require("@material-ui/core");
const { flip } = require("./themeType");

const initialState = {
  light: false,
};
const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case flip:
      return {
        ...state,
        light: !state.light,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
