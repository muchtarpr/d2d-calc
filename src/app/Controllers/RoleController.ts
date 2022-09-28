import { Controller, Get, Post, Param, Request, Body, Header, Render, Response, UseGuards, HttpCode, UseFilters, UsePipes } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { HttpExceptionFilter } from '../../exception';
import { ValidationPipe } from '../../validation';
import { AuthenticatedGuard } from '../Services/GuardAuthService';
import { RoleService } from '../Services/RoleService';
import { RoleCreateDto } from '../Models/dto/RoleCreateDto';
import { RoleEditDto } from '../Models/dto/RoleEditDto';

@Controller()
export class RoleController {
	constructor(
		private readonly roleService: RoleService
	) {}

	@Get('/role')
	@Render('module/role/index')
	public indexView() {
		return {
			title: 'Role',
		};
	}

	@Get('/role/create')
	@Render('module/role/create')
	public createView() {
		return {
			title: 'Role Create',
		};
	}

	@Get('/role/edit/:id')
	@Render('module/role/edit')
	public editView(@Param() param: any) {
		return {
			title: 'Role Edit',
			id: param.id,
		};
	}

	// @HttpCode(200)
	// @UseGuards(AuthenticatedGuard)
	// @UseFilters(new HttpExceptionFilter())
	// @Post('/api/v1/role/datatable')
	// @Header('Content-type', 'application/json')
	// async datatable(@Request() req: any): Promise<any> {
	// 	return this.roleService.datatable(req);
	// }

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@UsePipes(new ValidationPipe())
	@Post('/api/v1/role/create')
	@Header('Content-type', 'application/json')
	async create(@Request() req: any, @Body() roleCreateDto: RoleCreateDto): Promise<any> {
		return this.roleService.create(req);
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@Post('/api/v1/role/edit')
	@Header('Content-type', 'application/json')
	async edit(@Request() req: any): Promise<any> {
		return this.roleService.edit(req);
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@FormDataRequest()
	@UsePipes(new ValidationPipe())
	@Post('/api/v1/role/update/:id')
	@Header('Content-type', 'application/json')
	async update(@Param() param: any, @Request() req: any, @Body() roleEditDto: RoleEditDto): Promise<any> {
		return this.roleService.update(param, req);
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@Post('/api/v1/role/delete')
	@Header('Content-type', 'application/json')
	async delete(@Request() req: any): Promise<any> {
		return this.roleService.delete(req);
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@Post('/api/v1/role/multi-delete')
	@Header('Content-type', 'application/json')
	async multiDelete(@Request() req: any): Promise<any> {
		return this.roleService.multiDelete(req);
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@Post('/api/v1/role/get-role')
	@Header('Content-type', 'application/json')
	async getRole(@Request() req: any): Promise<any> {
		return this.roleService.getRole(req);
	}

	@HttpCode(200)
	@UseGuards(AuthenticatedGuard)
	@UseFilters(new HttpExceptionFilter())
	@Post('/api/v1/role/get-module-list')
	@Header('Content-type', 'application/json')
	async getModuleList(@Request() req: any): Promise<any> {
		return this.roleService.getModuleList(req);
	}
}
