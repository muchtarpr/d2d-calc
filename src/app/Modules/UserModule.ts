import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { UserController } from '../Controllers/UserController';
import { UserService } from '../Services/UserService';
import { User as UserModel } from '../Models/UserModel';
import { Role as RoleModel } from '../Models/RoleModel';
import { RoleUser as RoleUserModel } from '../Models/RoleUserModel';

@Module({
	imports: [
		ObjectionModule.forFeature([
			UserModel,
			RoleModel,
			RoleUserModel,
		]),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})

export class UserModule {}
