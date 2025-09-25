import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // ✅ correct storage import
import authReducer from "./reducer/authReducer";

// Root reducer
const rootReducer = combineReducers({
  authStore: authReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage, // ✅ lowercase and correct storage
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ allow non-serializable values
    }),
});

// Persistor
export const persistor = persistStore(store);
