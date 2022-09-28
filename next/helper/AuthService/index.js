import crypto from 'crypto';

const snapConfig = require('../../config');

export const loggedIn = () => {
	const user = localStorage.getItem('user');

	if (user) {
		return true;
	} else {
		return false;
	}
};

export const getProfile = () => {
	const user = localStorage.getItem('user');

	if (user) {
		let contents = Buffer.from(user, 'hex');
		let iv = contents.slice(0, 16);
		let textBytes = contents.slice(16);
		let decipher = crypto.createDecipheriv(
			'aes-256-cbc',
			snapConfig.APP_KEY,
			iv,
		);
		let decrypted = decipher.update(textBytes, 'hex', 'utf8');
		decrypted += decipher.final('utf8');

		return JSON.parse(decrypted);
	} else {
		return false;
	}
};
// export default class AuthService {
// 	constructor() {
// 		this.loggedIn = this.loggedIn.bind(this)
// 		this.getProfile = this.getProfile.bind(this)
// 	}

// 	loggedIn() {
// 		const user = localStorage.getItem('user')

// 		if(user) {
// 			return true
// 		} else {
// 			return false
// 		}
// 	}

// 	getProfile() {
// 		const user = localStorage.getItem('user')

// 		if(user) {
// 			let contents = Buffer.from(user, 'hex')
// 			let iv = contents.slice(0, 16)
// 			let textBytes = contents.slice(16)
// 			let decipher = crypto.createDecipheriv('aes-256-cbc', snapConfig.APP_KEY, iv)
// 			let decrypted = decipher.update(textBytes, 'hex', 'utf8')
// 			decrypted += decipher.final('utf8')

// 			return JSON.parse(decrypted)
// 		} else {
// 			return false
// 		}
// 	}
// }
