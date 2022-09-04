import {
	Controller,
	Get,
	Header,
	HttpCode,
	Request,
	Response,
} from '@nestjs/common';
import { MasterService } from '../Services/MasterService';

@Controller()
export class MasterController {
	constructor(private readonly masterService: MasterService) {}

	@HttpCode(200)
	@Get('/api/v1/master/tnc')
	@Header('Content-type', 'application/json')
	async getMasterTnc(@Request() req: any): Promise<any> {
		return this.masterService.getMasterTnc();
	}
}
