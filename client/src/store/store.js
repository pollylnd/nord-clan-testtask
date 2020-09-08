import { createStore, combineReducers, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";

import recipeSaga from "./recipe/saga";
import authSaga from "./auth/saga";

import recipeReducers from "./recipe/reducers";
import authReducers from "./auth/reducers";

const sagaMiddleware = createSagaMiddleware();

// Create a history of your choosing (we're using a browser history in this case)
const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [sagaMiddleware, routerMiddleware(history)];

const appReducer = combineReducers({
  auth: authReducers,
  recipe: recipeReducers,
  router: connectRouter(history),
});

const store = applyMiddleware(...middleware)(createStore)(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

sagaMiddleware.run(authSaga.authSaga)
sagaMiddleware.run(recipeSaga.recipeSaga);


export { store, history };
