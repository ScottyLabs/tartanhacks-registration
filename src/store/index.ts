import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import api from './middleware/api';

const middleware = [api /*logger*/];

const enhancedCompose =
	(process.env.NODE_ENV === 'development' &&
		typeof window !== 'undefined' &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const rootState = {} as any;

export default createStore(
	reducers,
	rootState,
	enhancedCompose(applyMiddleware(...middleware)),
);
