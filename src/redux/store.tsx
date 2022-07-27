import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { pairSlice } from "./reducers/pairs";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
// ...

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  pair: pairSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState, any>(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;

export type AppDispatch = typeof store.dispatch;
