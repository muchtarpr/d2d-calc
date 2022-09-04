import {
	Controller,
	Get,
	Header,
	HttpCode,
	Request,
	Response,
} from '@nestjs/common';
import { PrescriptionService } from '../Services/PrescriptionService';

@Controller()
export class PrescriptionController {
	constructor(private readonly prescriptionService: PrescriptionService) {}

	@HttpCode(200)
	@Get('/api/v1/prescription/detail')
	@Header('Content-type', 'application/json')
	async getPrescriptionDetail(@Request() req: any): Promise<any> {
		return this.prescriptionService.getDetail();
	}
}
