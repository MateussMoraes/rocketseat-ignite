import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import { ICartState } from "./modules/cart/types";

import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";

export interface IState {
  cart: ICartState
}

const sagaMiddlware = createSagaMiddleware();

const middlewares = [sagaMiddlware]

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);

sagaMiddlware.run(rootSaga)

export default store;