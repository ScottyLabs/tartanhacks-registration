import { createStore, applyMiddleware, compose } from "redux"
import reducers from "./reducers"
import api from "./middleware/api"
// import logger from "redux-logger"

const middleware = [api /*logger*/]

const enhancedCompose =
  (typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const rootState = {} as any

export default createStore(
  reducers,
  rootState,
  enhancedCompose(applyMiddleware(...middleware))
)
