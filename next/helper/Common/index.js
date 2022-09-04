import snapConfig from '../../config';

export const getFilenameUrl = (url) => {
	const regex = /([\w\d_-]*)\.?[^\\\/]*$/;
	const mathces = regex.exec(url);
	const filename = mathces[0] ? mathces[0] : url;

	return filename;
};

export const convertMB = (val) => {
	var res = '0 MB';
	try {
		res = val / 1000 + ' MB';
	} catch (error) {
		console.log('error on convert MB : ', error);
	} finally {
		return res;
	}
};

export const REGEX_CONST = {
	numeric: /[^0-9]/g,
	alphabet: /[^A-Za-z ]/g,
	alpha_numeric: /[^0-9A-Za-z ]/g,
	address: /[^-0-9A-Za-z .,&/'():+=]/gi,
};

export const removeCharByregex = (string, regex) => {
	return string.replace(regex, '');
};

export const encryptData = (params) => {
	if (params == undefined || params === null) {
		return null;
	}
	try {
		var CryptoJS = require('crypto-js');

		var str = params;
		if (typeof str === 'object' || Array.isArray(str)) {
			str = JSON.stringify(str);
		} else {
			str = str?.toString(); //null
		}

		var ciphertext = CryptoJS.AES.encrypt(str, snapConfig.SNAP_KEY);
		console.log('encrypted text : ', ciphertext.toString());

		return ciphertext.toString();
	} catch (error) {
		console.log('error on error encrypt : ', error);
		return null;
	}
};

export const decryptData = (params) => {
	if (params == undefined || params === null) {
		return null;
	}

	try {
		var CryptoJS = require('crypto-js');

		var bytes = CryptoJS.AES.decrypt(params, snapConfig.SNAP_KEY);
		var plaintext = bytes.toString(CryptoJS.enc.Utf8);
		console.log('decrypted text : ', plaintext);

		return plaintext;
	} catch (error) {
		console.log('error on decrpyt : ', error);
	}
};
