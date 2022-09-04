import { ConsoleLogger, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, tap } from 'rxjs';
var FormData = require('form-data');
var fs = require('fs');

@Injectable()
export class FileService {
	constructor(private readonly httpService: HttpService) {}

	async uploadFile(req: any): Promise<any> {
		try {
			return null;
			{/*const { id, ff } = req.body;
			console.log('req', req.body, files);
			let stream = fs.createWriteStream(files.originalname);
			await new Promise((resolve, reject) => {
				const file = fs.createWriteStream(files.originalname);
				file.end();
				file.on('finish', () => {
					resolve(true);
				});
			});
			let reader = fs.createReadStream(files.originalname);

			// stream.on('data', async () => {
			console.log('file done');
			// let reader = fs.createReadStream(files.originalname);

			// reader.on('close', () => {
			// 	console.log('closed', reader);
			// });

			// let read = await new Promise<void>((resolve) => {

			// 	reader.on('finish', () => {
			// 		console.log('finish', reader);
			// 		resolve();
			// 	});
			// });
			// stream.write(files.buffer);
			console.log('stream', reader);

			// const data = req.body;
			const data = new FormData();
			data.append('order_number', 'DK220800053');
			data.append('files', reader);
			// data.append('files', {
			// 	filename: files.originalname,
			// });
			// if (files && files?.length) {
			// 	files?.forEach((element: any) => {
			// 		data.append('files', element);
			// 	});
			// }
			console.log('data', data);
			let options = {
				baseURL: process.env.NEXT_PUBLIC_CONSUL_API_BASE_URL + 'v1/',
				method: 'POST',
				data: data,
				url: 'consultation/upload-file',
				timeout: parseInt(process.env.NEXT_PUBLIC_NEXT_TIMEOUT, 60000),
				headers: {
					Authorization:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50RGF0YSI6eyJlbWFpbCI6ImxvcmVtaXBzdW1AdG9rb3BlZGlhLmNvbSIsIm5hbWUiOiJUc2FuaSBMb3JlbSIsInR5cGUiOiJVU0VSIiwieGlkIjoiZTFjNGU3MTItMDYxYS00ZTFjLTk4OTQtZTA0MWJkMjJjNzVmIiwiaWQiOjE3fSwiY29uc3R1bGF0aW9uRGF0YSI6eyJpZCI6NzksInBhdGllbnRfaWQiOjE3LCJzZWNyZXRfa2V5Ijoidm1KTHprYlNCVTRLY0trNGtkcU5lS0FFMGxmUlFlemthVlpHNVdJQ0Z6MVQ1S3dnUVZMUlJycjdDNXRWYjFGRHp0b3JLbUhIeFJGSXpuYkUiLCJvcmRlcl9udW1iZXIiOiJESzIyMDgwMDA1MyIsImNyZWF0ZWRfYXQiOiIyMDIyLTA4LTA5IDE1OjM2OjEzIiwiYWNjZXB0ZWRfYXQiOiIyMDIyLTA4LTA5IDE1OjM2OjI3IiwiY2xvc2VkX2F0IjpudWxsLCJzdGF0dXMiOiJTVEFSVEVEIiwiYXNzaWduZWVfZG9jdG9yX2lkIjoiWDVVRVlEV0RrWmhNM1BaWDhRNTRtR3FjMHc2MiIsInBhcnRuZXJfb3JkZXJfbnVtYmVyIjoiVEtQMDAwMTkyOTIzMjEzIiwiaGVhbHRoX2ZhY2lsaXR5X2RvY3Rvcl9pZCI6MiwiZXhwaXJlZF9hdCI6IjIwMjItMDgtMjAgMTU6NTE6MjcifSwiaWF0IjoxNjYwMjI4MDI3LCJleHAiOjE2NjExMjgwMjd9.qqJIHtgmXl2ZIWDNEWwLHyRCBkletUojb8vU75cd54M',
					'Content-Type': 'multipart/form-data',
				},
			};

			let res = await lastValueFrom(
				this.httpService.request(options).pipe(
					tap((resp) => console.log(resp)),
					map((res) => {
						console.log(res);

						try {
							fs.unlinkSync(files.originalname);
							//file removed
						} catch (err) {
							console.error(err);
						}
						return res.data;
					}),
				),
			);
				return res;*/}
			// });
		} catch (error) {
			console.log('error', error);
			return error;
		}
	}
}
