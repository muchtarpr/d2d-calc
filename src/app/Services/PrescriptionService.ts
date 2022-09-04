import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, tap } from 'rxjs';

@Injectable()
export class PrescriptionService {
	constructor(private readonly httpService: HttpService) {}

	async getDetail(): Promise<any> {
		let options = {
			baseURL:
				'https://f050121f-d909-4a3a-a20d-769b8ac3e9d0.mock.pstmn.io/', //process.env.NEXT_PUBLIC_API_BASE_URL,
			method: 'GET',
			url: 'getrecipediagnose',
			timeout: parseInt(process.env.TIMEOUT, 60000),
		};
		let res = await lastValueFrom(
			this.httpService.request(options).pipe(
				map((res) => {
					return res.data;
				}),
			),
		);
		return res;
	}
}
