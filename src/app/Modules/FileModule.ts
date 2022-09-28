import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FileController } from '../Controllers/FileController';
import { FileService } from '../Services/FileService';

@Module({
	imports: [HttpModule],
	controllers: [FileController],
	providers: [FileService],
	exports: [FileService],
})
export class FileModule {}
