import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { SettingController } from '../Controllers/SettingController';
import { SettingService } from '../Services/SettingService';
import { Setting as SettingModel } from '../Models/SettingModel';

@Module({
	imports: [
		ObjectionModule.forFeature([
			SettingModel,
		])
	],
	controllers: [SettingController],
	providers: [SettingService],
	exports: [SettingService],
})

export class SettingModule {}
