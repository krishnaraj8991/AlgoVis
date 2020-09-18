import { combineReducers } from "redux";
import graphReducer from "./graph/graphReducer";
import ThemeReducer from "./themeState/themeReducer";

const rootReducer = combineReducers({
  graph: graphReducer,
  theme: ThemeReducer,
});

export default rootReducer;
