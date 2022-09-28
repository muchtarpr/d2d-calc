import { Injectable, Inject } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserService } from '../Services/UserService';
import { CheckAuth } from '../Helpers/CheckAuth';

@Injectable()
export class AuthService {
	constructor(
		@Inject(UserService) private readonly userService: UserService
	) {}
	
	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.userService.getByEmail(email);
		if (user) {
			const valid = await this.verifyPassword(password, user.password);
			if (valid) {
				user.password = undefined;
				return user;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	async verifyPassword(plainTextPassword: string, hashedPassword: string) {
		const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
		if (!isPasswordMatching) {
			return false;
		}
		return true;
	}

	async checkAuth(req: any): Promise<any> {
		const formData = req.body;

		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get(formData.module, formData.permission, req.user.data)
		if (checkAuth) {
			return {
				code: '2000',
				message: 'User can access this module',
				data: []
			}
		} else {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}
	}
}
