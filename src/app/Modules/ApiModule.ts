import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { ApiService } from '../Services/ApiService';
import { ApiService as ApiServiceModel } from '../Models/ApiServiceModel';

@Module({
	imports: [
		ObjectionModule.forFeature([
			ApiServiceModel
		]),
	],
	controllers: [],
	providers: [ApiService],
	exports: [ApiService],
})

export class ApiModule {}
