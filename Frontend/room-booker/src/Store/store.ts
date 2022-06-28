import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice';
import {
  persistReducer,
  persistStore
} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

//export const history = createBrowserHistory()

const reducers = combineReducers({
  auth: authSlice 
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store)
