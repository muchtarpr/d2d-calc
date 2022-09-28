import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
/**
 * Prepare the Redux Store
 */

const composedMiddlewares = applyMiddleware(thunk);

const storeEnhancers = composeWithDevTools({
	name: 'React-node-test',
})(composedMiddlewares);

export const store = createStore(reducers, storeEnhancers);
// create a makeStore function
const makeStore = (context) => store;

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: false });
