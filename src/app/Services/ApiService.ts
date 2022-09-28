import { Injectable } from '@nestjs/common';
import { 
	InjectModel,
	synchronize,
} from 'nestjs-objection';
import { ApiService as ApiServiceModel } from '../Models/ApiServiceModel';

@Injectable()
export class ApiService {
	constructor(
		@InjectModel(ApiServiceModel) private readonly apiServiceModel: typeof ApiServiceModel,
	) {}

	// async findAll(): Promise<any> {
	// 	const ApiService = await this.apiServiceModel.query();
	// 	return ApiService;
	// }
}
