import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class RoleCreateDto {
	@IsString()
	@IsNotEmpty()
	role_title: string;

	@IsString()
	@IsNotEmpty()
	role_slug: string;

	@IsArray()
	@IsNotEmpty()
	role_access: [];
}