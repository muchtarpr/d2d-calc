import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MasterController } from '../Controllers/MasterController';
import { MasterService } from '../Services/MasterService';

@Module({
	imports: [HttpModule],
	controllers: [MasterController],
	providers: [MasterService],
	exports: [MasterService],
})
export class MasterModule {}
