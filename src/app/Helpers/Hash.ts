import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import appConfig from '../../config/app';

@Injectable()
export class Hash {
	key: string;
	constructor() {
		this.key = appConfig().appKey;
	}

	encrypt(data: any): any {
		let iv = crypto.randomBytes(16);
		let cipher = crypto.createCipheriv('aes-256-cbc', this.key, iv);
		let cipherText = cipher.update(data, 'utf8', 'hex');
		cipherText += cipher.final('hex');
		cipherText = iv.toString('hex') + cipherText;

		return cipherText;
	}

	decrypt(data: any): any {
		let contents = Buffer.from(data, 'hex');
		let iv = contents.slice(0, 16);
		let textBytes = contents.slice(16);
		let decipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv);
		let decrypted = decipher.update(textBytes.toString('hex'), 'hex', 'utf8');
		decrypted += decipher.final('utf8');

		return decrypted;
	}
}
