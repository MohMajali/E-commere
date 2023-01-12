import { compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { rootReducers } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//root reducer

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);