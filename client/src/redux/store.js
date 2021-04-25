import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import rootReducer from "./rootReducer";

const persistConfig = {
 key: 'root',
 storage: sessionStorage,
 whitelist: ["login"]
};

const persistRootReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistRootReducer);
export const persistor = persistStore(store);