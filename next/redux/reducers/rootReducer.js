import { combineReducers } from 'redux';
import generalReducer from './generalReducer';

const rootReducer = combineReducers({
	general: generalReducer,
});

export default rootReducer;
