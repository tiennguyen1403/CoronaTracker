import { compose } from "redux"
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = configureStore({
    reducer: rootReducer,
    composeEnhancers,
})

export default store;