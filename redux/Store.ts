import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { apiReducer, sportReducer } from "./Reducer";

const appReducers = combineReducers({
  apiReducer,
  sportReducer,
});

const rootReducer = (state: any, action: any) => appReducers(state, action);

const logger = createLogger();

let middleware: any = [];
middleware = [...middleware, thunk, logger];

export default createStore(
  rootReducer,
  compose(applyMiddleware(...middleware))
);
