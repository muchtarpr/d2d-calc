import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { RoleController } from '../Controllers/RoleController';
import { RoleService } from '../Services/RoleService';
import { Role as RoleModel } from '../Models/RoleModel';

@Module({
	imports: [
		ObjectionModule.forFeature([
			RoleModel,
		]),
		NestjsFormDataModule
	],
	controllers: [RoleController],
	providers: [RoleService],
	exports: [RoleService],
})

export class RoleModule {}
