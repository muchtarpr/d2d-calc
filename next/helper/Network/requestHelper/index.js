import axios from 'axios';
import snapConfig from '../../../config';

export const API_CALL = async (
	option = 'GET',
	contentType = 'application/json; charset=UTF-8',
) => {
	try {
		const API_OPTION = {
			baseURL: snapConfig.BASE_API_URL,
			headers: {
				'Content-Type': contentType,
				'Authorization' : global.tokenAuthorization ?? '',
			},
			...option,
		};
		console.log('API OPTION API CALL -> ', API_OPTION);
		const res = await axios.request(API_OPTION);
		console.log('res API CALL -> ', res);

		return responseHandler(res);
	} catch (error) {
		console.log('error on call api : ', error);
		let error_temp =
			error && error.response
				? error.response.data
				: error
				? error
				: 'something went wrong';
		return error_temp;
	}
};

//return data from response
export const responseHandler = (res) => {
	return res.data;
};

// convert error response from axios
export const errorHandler = (error) => {
	let response = error;

	return response;
};
