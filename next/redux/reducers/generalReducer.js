import { GET_PRESCRIPTION } from '../actions/generalAction';

let initialState = {
	prescription: {
		result: false,
		loading: false,
		error: false,
	},
};

const generalReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case GET_PRESCRIPTION:
			return {
				...state,
				prescription: {
					result: action.payload.data,
					loading: action.payload.loading,
					error: action.payload.errorMessage,
				},
			};
		default:
			return { ...state };
	}
};

export default generalReducer;
