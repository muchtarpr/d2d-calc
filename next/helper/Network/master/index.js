import snapConfig from '../../../config';
import { API } from '../API';
import { API_CALL, errorHandler } from '../requestHelper';

export const getMasterTnc = async (id) => {
	console.log("ws" , snapConfig.API_BASE_URL);
	try {
		const options = {
			url: snapConfig.BASE_API_URL + API.MASTER_TNC,
		};
		let response = await API_CALL(options);
		return response;
	} catch (error) {
		console.log('error on get master tnc : ', error);
		return errorHandler(error);
	}
};
