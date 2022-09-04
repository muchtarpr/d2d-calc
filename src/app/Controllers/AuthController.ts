import { Controller, Get, Post, Param, Request, Body, Header, Render, Response, Redirect, UseGuards, UseFilters, HttpCode } from '@nestjs/common';
import delay from 'delay';
import { HttpExceptionFilter } from '../../exception';
import { AuthService } from '../Services/AuthService';
import { LocalAuthGuard } from '../Services/LocalAuthService';
import { AuthenticatedGuard } from '../Services/GuardAuthService';

@Controller()
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) {}

	@HttpCode(200)
	@UseGuards(LocalAuthGuard)
	@UseFilters(new HttpExceptionFilter())
	@Post('/api/v1/login')
	@Header('Content-type', 'application/json')
	async login(@Request() req: any): Promise<any> {
		return req.user;
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@Post('/api/v1/check-login')
	@Header('Content-type', 'application/json')
	async checkLogin(@Request() req: any): Promise<any> {
		return req.user;
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@Post('/api/v1/check-auth')
	@Header('Content-type', 'application/json')
	async checkAuth(@Request() req: any): Promise<any> {
		return this.authService.checkAuth(req);
	}

	@Get('/logout')
	@Header('Content-type', 'application/json')
	async logout(@Request() req: any, @Response() res: any): Promise<any> {
		res.clearCookie('connect.sid');
		res.clearCookie('gkube-session.sid');
		req.logout;
		req.session = null;
		await delay(1000);
		res.redirect('/');
	}
}
