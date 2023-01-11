import { compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { rootReducers } from './root-reducer';

//root reducer
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducers, undefined, composedEnhancers);