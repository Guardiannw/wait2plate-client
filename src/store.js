import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
// import promise from "redux-promise-middleware";
import { wait2plateReducer } from "./reducers";

const middleware = applyMiddleware(thunk, logger);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(wait2plateReducer, composeEnhancers(middleware));

export default store;
