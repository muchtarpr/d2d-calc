import snapConfig from '../../../config';
import { API } from '../API';
import { API_CALL, errorHandler } from '../requestHelper';

export const getChatDetailData = async (id) => {
	console.log("ws" , snapConfig.API_BASE_URL);
	try {
		const options = {
			url: snapConfig.BASE_API_URL + API.CHAT_DETAIL,
		};
		let response = await API_CALL(options);
		return response;
	} catch (error) {
		console.log('error on get detail chat : ', error);
		return errorHandler(error);
	}
};

export const getConsulUser = async (orderNumber, type) => {
	console.log("ws" , snapConfig.API_BASE_URL);
	try {
		const options = {
			url: snapConfig.BASE_API_URL + API.CONSUL_USER + `/${orderNumber}/${type}`,
		};
		let response = await API_CALL(options);
		return response;
	} catch (error) {
		console.log('error on get user detail : ', error);
		return errorHandler(error);
	}
};

export const getConsulVerify = async (token) => {
	console.log("ws" , snapConfig.API_BASE_URL);
	try {
		const options = {
			url: snapConfig.BASE_API_URL + API.CONSUL_VERIFY + `/${token}`,
		};
		let response = await API_CALL(options);
		return response;
	} catch (error) {
		console.log('error on get user detail : ', error);
		return errorHandler(error);
	}
};

export const getConsulDetail = async (orderNumber) => {
	console.log("ws" , snapConfig.API_BASE_URL);
	try {
		const options = {
			url: snapConfig.BASE_API_URL + API.CONSUL_DETAIL + `/${orderNumber}`,
		};
		let response = await API_CALL(options);
		return response;
	} catch (error) {
		console.log('error on getConsulDetail : ', error);
		return errorHandler(error);
	}
};