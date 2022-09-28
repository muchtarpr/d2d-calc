import snapConfig from '../../../config';
import { API } from '../API';
import { API_CALL, errorHandler } from '../requestHelper';

export const getPrescriptionDetail = async (id) => {
	try {
		const options = {
			url: snapConfig.BASE_API_URL + API.PRESCRIPTION_DETAIL,
		};
		let response = await API_CALL(options);
		return response;
	} catch (error) {
		console.log('error on get detail prescription : ', error);
		return errorHandler(error);
	}
};
