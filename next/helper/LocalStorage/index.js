export const getLocalStorage = async (key) => {
	let res = (await localStorage.getItem(key)) ?? null;
	return res;
};

export const getParsedLocalStorage = async (key) => {
	var res;
	try {
		res = (await localStorage.getItem(key)) ?? null;
		res = JSON.parse(res);
	} catch (error) {
		console.log('error : ', error);
	} finally {
		return res;
	}
};

export const setLocalStorage = async (key, value) => {
	let res = (await localStorage.setItem(key, value)) ?? null;
	return res;
};

export const setStringifyLocalStorage = async (key, value) => {
	let res;
	try {
		let valStringify = JSON.stringify(value);
		res = (await localStorage.setItem(key, valStringify)) ?? null;
	} catch (error) {
		console.log('error : ', error);
	} finally {
		return res;
	}
};

export const removeLocalStorage = async (key) => {
	try {
		await localStorage.removeItem(key);
	} catch (error) {
		console.log('error : ', error);
	}
};

export const LOCALSTORAGE = {
	USER: 'USER',
	FORM_CONSULTATION: 'FORM_CONSULTATION',
	CHATDETAIL_COACHMARK: 'CHATDETAIL_COACHMARK',
};
