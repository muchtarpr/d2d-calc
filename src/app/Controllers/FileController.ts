import {
	Controller,
	Get,
	Header,
	HttpCode,
	Param,
	Post,
	Req,
	Request,
	Response,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../Services/FileService';

@Controller()
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@HttpCode(200)
	@Post('/api/v1/file/upload/')
	@Header('Content-type', 'multipart/form-data')
	// @Header('Content-type', 'application/json')
	@UseInterceptors(FileInterceptor('files'))
	async getUserDetail(
		@Req() req: any,
		// @UploadedFile() files: Express.Multer.File,
	): Promise<any> {
		console.log('res', req.body);
		// return this.fileService.uploadFile(req, files);
	}
}
