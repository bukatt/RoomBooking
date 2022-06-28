import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice';
import {
  persistReducer,
  persistStore
} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  auth: authSlice 
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
