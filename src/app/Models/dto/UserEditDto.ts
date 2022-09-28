import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

export class UserEditDto {
	@IsString()
	@IsNotEmpty()
	fullname: string;

	@IsString()
	@IsNotEmpty()
	username: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	password: string;

	@IsInt()
	@IsNotEmpty()
	user_type: number;

	@IsInt()
	@IsNotEmpty()
	user_role: number;
}