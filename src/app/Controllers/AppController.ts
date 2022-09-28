import {
	Controller,
	Get,
	Param,
	Render,
	Response,
	StreamableFile,
	UseInterceptors,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from '../Services/AppService';
import { ParamsInterceptor } from '../Middleware/ParamsInterceptor';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/service-worker.js')
	serviceWorker(@Response({ passthrough: true }) res: any): StreamableFile {
		const file = createReadStream(
			join(process.cwd(), './next/.next/service-worker.js'),
		);
		res.set({
			'Content-Type': 'application/javascript',
			'Content-Disposition': 'attachment; filename="service-worker.js"',
		});
		return new StreamableFile(file);
	}

	@Get('/workbox-:id.js')
	workboxId(
		@Param() params,
		@Response({ passthrough: true }) res: any,
	): StreamableFile {
		const workbox = createReadStream(
			join(process.cwd(), './public/workbox-1.js'),
		);
		const file = createReadStream(
			join(process.cwd(), './next/.next/workbox-' + params.id + '.js'),
		);
		res.set({
			'Content-Type': 'application/javascript',
			'Content-Disposition':
				'attachment; filename="workbox-' + params.id + '.js"',
		});
		if (file) {
			return new StreamableFile(file);
		} else {
			return new StreamableFile(workbox);
		}
	}

	@Get('/api/v1')
	getHello(): {} {
		return this.appService.getHello();
	}

	@Get()
	@Render('index')
	@UseInterceptors(ParamsInterceptor)
	public index() {
		return {
			title: 'Welcome to GKUBE',
		};
	}

	@Get('/dashboard')
	@Render('dashboard')
	public dashboard() {
		return {
			title: 'Dashboard',
		};
	}

	@Get('/forbidden')
	@Render('forbidden')
	public forbidden() {
		return {
			title: 'Forbidden',
		};
	}
}
