import { Controller, Get, Post, Param, Request, Body, Header, Render, Response, UseGuards, HttpCode, UseFilters, UsePipes } from '@nestjs/common';
import { HttpExceptionFilter } from '../../exception';
import { ValidationPipe } from '../../validation';
import { AuthenticatedGuard } from '../Services/GuardAuthService';
import { UserService } from '../Services/UserService';
import { UserCreateDto } from '../Models/dto/UserCreateDto';
import { UserEditDto } from '../Models/dto/UserEditDto';

@Controller()
export class UserController {
	constructor(
		private readonly userService: UserService
	) {}

	@Get('/user')
	@Render('module/user/index')
	public indexView() {
		return {
			title: 'User',
		};
	}

	@Get('/user/create')
	@Render('module/user/create')
	public createView() {
		return {
			title: 'User Create',
		};
	}

	@Get('/user/edit/:id')
	@Render('module/user/edit')
	public editView(@Param() param: any) {
		return {
			title: 'User Edit',
			id: param.id,
		};
	}

	// @HttpCode(200)
	// @UseGuards(AuthenticatedGuard)
	// @UseFilters(new HttpExceptionFilter())
	// @Post('/api/v1/user/datatable')
	// @Header('Content-type', 'application/json')
	// async datatable(@Request() req: any): Promise<any> {
	// 	return this.userService.datatable(req);
	// }

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@UsePipes(new ValidationPipe())
	@Post('/api/v1/user/create')
	@Header('Content-type', 'application/json')
	async create(@Request() req: any, @Body() userCreateDto: UserCreateDto): Promise<any> {
		return this.userService.create(req);
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@Post('/api/v1/user/edit')
	@Header('Content-type', 'application/json')
	async edit(@Request() req: any): Promise<any> {
		return this.userService.edit(req);
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@UsePipes(new ValidationPipe())
	@Post('/api/v1/user/update/:id')
	@Header('Content-type', 'application/json')
	async update(@Param() param: any, @Request() req: any, @Body() userEditDto: UserEditDto): Promise<any> {
		return this.userService.update(param, req);
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@Post('/api/v1/user/delete')
	@Header('Content-type', 'application/json')
	async delete(@Request() req: any): Promise<any> {
		return this.userService.delete(req);
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@Post('/api/v1/user/multi-delete')
	@Header('Content-type', 'application/json')
	async multiDelete(@Request() req: any): Promise<any> {
		return this.userService.multiDelete(req);
	}
}
