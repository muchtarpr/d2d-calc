import { Injectable, Inject } from '@nestjs/common';
import { ApiService } from '../Services/ApiService';

@Injectable()
export class AppService {
	constructor(
		@Inject(ApiService) private readonly apiService: ApiService
	) {}
	
	getHello(): {} {
		return {
			title: 'Welcome to GKUBE',
			description: 'GKUBE Is API Services',
			version: '1.0',
			copyright: 'PT Global Urban Esensial'
		};
	}
}
