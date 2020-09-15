import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

const store = createStore(
  rootReducer,
  composeWithDevTools()
  // applyMiddleware(logger)
  // other store enhancers if any
);

export default store;
