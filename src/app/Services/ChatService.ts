import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, tap } from 'rxjs';

@Injectable()
export class ChatService {
	constructor(private readonly httpService: HttpService) {}

	async getDetail(): Promise<any> {
		let options = {
			baseURL:
				'https://f050121f-d909-4a3a-a20d-769b8ac3e9d0.mock.pstmn.io/', //process.env.NEXT_PUBLIC_API_BASE_URL,
			method: 'GET',
			url: 'getdetailchat',
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

	async getConsulUser(param, req, header: any): Promise<any> {
		console.log('getUserDetail', param, req);

		let options = {
			baseURL: "https://staging-consultapi.d2d.co.id/v1/",
			// baseURL: process.env.NEXT_PUBLIC_CONSUL_API_BASE_URL,
			// 'https://f050121f-d909-4a3a-a20d-769b8ac3e9d0.mock.pstmn.io/', //process.env.NEXT_PUBLIC_API_BASE_URL,
			method: 'GET',
			url: `consultation/${param.orderNumber}/${param.type}/user`,
			timeout: parseInt(process.env.TIMEOUT, 60000),
			headers: {
				authorization: header.authorization,
			},
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

	async postChatVerify(token: String): Promise<any> {
		let options = {
			baseURL: "https://staging-consultapi.d2d.co.id/v1/",
			// baseURL: process.env.NEXT_PUBLIC_CONSUL_API_BASE_URL,
			method: 'POST',
			url: 'consultation/verify',
			timeout: parseInt(process.env.TIMEOUT, 60000),
			data: {
				token: token,
			},
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

	async getConsulDetail(orderNumber: String, header: any): Promise<any> {
		let options = {
			baseURL: "https://staging-consultapi.d2d.co.id/v1/",
			// baseURL: process.env.NEXT_PUBLIC_CONSUL_API_BASE_URL,
			method: 'GET',
			url: `consultation/${orderNumber}/detail`,
			timeout: parseInt(process.env.TIMEOUT, 60000),
			headers: {
				authorization: header.authorization,
			},
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
