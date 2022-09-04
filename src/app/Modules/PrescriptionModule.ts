import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrescriptionController } from '../Controllers/PrescriptionController';
import { PrescriptionService } from '../Services/PrescriptionService';

@Module({
	imports: [HttpModule],
	controllers: [PrescriptionController],
	providers: [PrescriptionService],
	exports: [PrescriptionService],
})
export class PrescriptionModule {}
