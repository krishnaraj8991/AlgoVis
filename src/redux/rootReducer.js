import { combineReducers } from "redux";
import graphReducer from "./graph/graphReducer";

const rootReducer = combineReducers({
  graph: graphReducer,
});

export default rootReducer;
