import { Controller, Get, Post, Param, Request, Body, Header, Render, Response, UseGuards, HttpCode, UseFilters, UsePipes } from '@nestjs/common';
import { HttpExceptionFilter } from '../../exception';
import { ValidationPipe } from '../../validation';
import { AuthenticatedGuard } from '../Services/GuardAuthService';
import { SettingService } from '../Services/SettingService';

@Controller()
export class SettingController {
	constructor(
		private readonly settingService: SettingService
	) {}

	@Get('/setting')
	@Render('module/setting/index')
	public indexView() {
		return {
			title: 'Setting',
		};
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@Post('/api/v1/setting/get-by-group')
	@Header('Content-type', 'application/json')
	async getByGroup(@Request() req: any): Promise<any> {
		return this.settingService.getByGroup(req);
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@Post('/api/v1/setting/edit')
	@Header('Content-type', 'application/json')
	async edit(@Request() req: any): Promise<any> {
		return this.settingService.edit(req);
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@UsePipes(new ValidationPipe())
	@Post('/api/v1/setting/update/:id')
	@Header('Content-type', 'application/json')
	async update(@Param() param: any, @Request() req: any): Promise<any> {
		return this.settingService.update(param, req);
	}
}
