import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import recipeSaga from  './recipe/saga'
import userSaga from  './user/saga'

import recipeReducers   from './recipe/reducers'
import userReducers   from './user/reducers'

const sagaMiddleware = createSagaMiddleware()

// Create a history of your choosing (we're using a browser history in this case)
const history = createBrowserHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [
  sagaMiddleware,
  routerMiddleware(history)
]

const appReducer = combineReducers({
  recipe:   recipeReducers,
  user:     userReducers,
})

const store = applyMiddleware(...middleware)(createStore)(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

sagaMiddleware.run(recipeSaga.recipeSaga)
sagaMiddleware.run(userSaga.userSaga)

export {
  store,
  history,
}